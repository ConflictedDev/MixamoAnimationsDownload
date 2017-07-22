//--------------------------------------------------------------------
// Class Implementation

class AnimationManager
{
    constructor()
    {
        this.animationList = new Array();
        this.animationIndex = 0;              // Determines the current animation on the page we want to add.
        this.isAddingCurrentPreview = false;  // Determines if we are currently adding an animation to the account.
        this.isAddingAnimations = false;      // Determines if we are currently adding animations on the page.
        this.isLoadingNextPage = true;        // Determines if we are currently changing page instead of adding animations.
        this.isLoadingProducts = true;        // Determines if the page's spinner-dog is currently loading the products for the next page.
        this.totalAnimationsAlreadyOwned = 0; // Meta data for completion-feedback of animations that did not need adding.
        this.totalAnimationsAdded = 0;        // Meta data for completion-feedback of animations that were added by the script.
    }

    initialise()
    {
        this.handleNewPage();
    }

    onProductMutation(mutations)
    {
        this.handleNewPage();
    }

    onPreviewMutation(mutations)
    {
        this.update();
    }

    handleNewPage()
    {
        if ($(".spinner-dog").length === 0)
        {
            // To avoid unexpected mutations from running this when it isn't supposed to, ensure loading has occurred as well:
            if (this.isLoadingProducts && this.isLoadingNextPage)
            {
                this.populateAnimationList();
                if (this.animationList.length != 0)
                {
                    console.log("Adding animations on current page to account...");
                    window.scrollTo(0, document.body.scrollHeight);
                    this.isLoadingNextPage = false;
                    this.isLoadingProducts = false;

                    this.openAnimationPreview();
                }
            }
        }
        else if (!this.isLoadingProducts)
        {
            this.isLoadingProducts = true; // This is needed as loading a new page doesn't add the spinner dog immediately.
        }
    }

    update()
    {
        if (this.isLoadingNextPage === false)
        {
            this.addAnimation();
        }
    }

    addAnimation()
    {
        var cartButton = $(domPreviewCartButtonPath)[0];
        if (cartButton)
        {
            if (cartButton.childNodes[0].textContent === "View / Download")
            {
                if (this.isAddingCurrentPreview === false)
                {
                    console.log("This animation has already been added, going to next animation...");
                    ++this.totalAnimationsAlreadyOwned;
                }
                else
                {
                    this.isAddingCurrentPreview = false;
                }

                ++this.animationIndex;
                this.openAnimationPreview();
            }
            else if (!this.isAddingCurrentPreview && cartButton.childNodes[0].textContent === "Add to My Assets")
            {
                console.log("Adding new animation...");
                this.isAddingCurrentPreview = true;
                cartButton.click();
                ++this.totalAnimationsAdded;
            }
        }
    }

    openAnimationPreview()
    {
        if (this.isLoadingNextPage === false)
        {
            if (this.animationIndex < this.animationList.length)
            {
                this.animationList[this.animationIndex].click();
                this.isAddingAnimations = true;
            }
            else
            {
                this.loadNextPage();
            }
        }
    }

    loadNextPage()
    {
        this.isLoadingNextPage = true;
        this.isAddingAnimations = false;
        this.animationIndex = 0;

        var lastButton = $(domPaginationPath)[0].lastChild.firstChild;
        if (lastButton && lastButton.firstChild.classList.contains("fa-angle-right"))
        {
            console.log("Loading next page...");
            lastButton.click();
        }
        else
        {
            disconnectProductObserver();
            disconnectPreviewObserver();
            console.log("Reached last page - finished adding animations.");
            console.log(("Total animations added: " + this.totalAnimationsAdded + "; total animations already owned: " + this.totalAnimationsAlreadyOwned));
        }
    }

    populateAnimationList()
    {
        console.log("Retrieving animations on current page...");
        var animationNodes = $(domProductListPath)[0].childNodes;
        this.animationList = [];
        for (var index = 0; index < animationNodes.length; ++index)
        {
            if (animationNodes[index].classList.contains("product-animation"))
            {
                this.animationList.push(animationNodes[index]);
            }
        }
    }
}

//--------------------------------------------------------------------
// jQuery Implementation

function loadJquery(onExistsCallback)
{
    // Add the jQuery script and poll until it exists:
    var script = document.createElement("SCRIPT");
    script.src = 'https://code.jquery.com/jquery-latest.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    pollJqueryExistence(onExistsCallback);
}

function pollJqueryExistence(onExistsCallback)
{
    if (window.jQuery)
    {
        onExistsCallback();
    }
    else
    {
        window.setTimeout(function() { pollJqueryExistence(onExistsCallback) }, loadWaitInMilliseconds);
    }
}

//--------------------------------------------------------------------
// Script Start-up Implementation

function start()
{
    console.clear();
    loadJquery(startAddingAnimations);
}

function startAddingAnimations()
{
    // Create the animation manager and setup the mutation observers:
    var animationManager = new AnimationManager();
    var productObserver = new MutationObserver(function(mutations) { animationManager.onProductMutation(mutations); } ); // Bound to animationManager instance via anonymous function.
    var previewObserver = new MutationObserver(function(mutations) { animationManager.onPreviewMutation(mutations); } ); // Bound to animationManager instance via anonymous function.
    disconnectProductObserver = function() { productObserver.disconnect(); console.log("Product mutation observer disonnected."); };
    disconnectPreviewObserver = function() { previewObserver.disconnect(); console.log("Preview mutation observer disonnected."); };

    // Initialise the animation manager then begin observing mutations (nodes need to be retrieved after manager initialisation):
    animationManager.initialise();
    var productTarget = $(domProductPath)[0];
    var previewTarget = $(domPreviewSideBarPath)[0]; // Observing sidebar because observing the product-preview's subtree will detect endless mutations due to playback controls.
    var productObserverConfig = { childList: true, subtree: true, attributes: true, characterData: true };
    var previewObserverConfig = { childList: true, subtree: true, attributes: true, characterData: true };
    productObserver.observe(productTarget, productObserverConfig);
    previewObserver.observe(previewTarget, previewObserverConfig);
}

//--------------------------------------------------------------------
// Script Declarations

const domProductPath = "div.product-search > div.product-results";
const domProductListPath = domProductPath + " > div.product-list";
const domPreviewSideBarPath = "div.product-preview > div.editor > div.editor-sidebar";
const domPaginationPath = "div.product-results > div.pagination-holder > ul";
const domPreviewCartButtonPath = domPreviewSideBarPath + " > div.sidebar-header > button";
const loadWaitInMilliseconds = 20;
var disconnectProductObserver;
var disconnectPreviewObserver;

//--------------------------------------------------------------------
// Script Execution

start();
