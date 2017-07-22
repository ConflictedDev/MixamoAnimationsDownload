//--------------------------------------------------------------------
// Script Implementation

function tryDownloading(totalPageDownloads)
{
    console.clear();
    currentDownloadAttemptTimeInSeconds = 0;
    downloadAttemptWaitTimeout = null;
    
    startDownloading(totalPageDownloads);
}

function fetchDownloadButtons()
{
    var downloadButtons = new Array();
    var buttonElements = document.getElementsByClassName("btn-primary");
    for (var index = 0; index < buttonElements.length; ++index)
    {
        var element = buttonElements[index];
        if (element.textContent === "Download")
        {
            downloadButtons.push(element);
        }
    }
    
    return (downloadButtons);
}

function startDownloading(totalPageDownloads)
{
    if (currentDownloadAttemptTimeInSeconds < downloadAttemptDurationInSeconds)
    {
        var downloadButtons = fetchDownloadButtons();
        if (downloadButtons.length < totalPageDownloads)
        {
            downloadAttemptWaitTimeout = window.setTimeout(function() { startDownloading(totalPageDownloads) }, (downloadAttemptWaitInSeconds * 1000));
            currentDownloadAttemptTimeInSeconds += downloadAttemptWaitInSeconds;
            console.log("Waiting for " + totalPageDownloads + " downloads: " + downloadButtons.length + " ready so far...");
        }
        else
        {
            downloadAttemptWaitTimeout = null;
            var downloadCount = 0;
            for (var index = 0; index < downloadButtons.length; ++index)
            {
                downloadButtons[index].click();
                ++downloadCount;
            }
            console.log(downloadCount + " animation downloads started...");
        }
    }
    else
    {
        console.log("No downloads ready after trying for " + downloadAttemptDurationInSeconds + " seconds. Starting downloads will now stop.");
        downloadAttemptWaitTimeout = null;
    }
}

function stopTrying()
{
    if (downloadAttemptWaitTimeout != null)
    {
        window.clearTimeout(downloadAttemptWaitTimeout);
        currentDownloadAttemptTimeInSeconds = 0;
        downloadAttemptWaitTimeout = null;
        console.log("Trying to download has been stopped.");
    }
    else
    {
        console.log("StopTrying was called but no download attempts were in progress.");
    }
}

//--------------------------------------------------------------------
// Script Declarations

var downloadAttemptDurationInSeconds = 120;
var currentDownloadAttemptTimeInSeconds = 0;
var downloadAttemptWaitInSeconds = 0.5;
var downloadAttemptWaitTimeout = null;

//--------------------------------------------------------------------
// Script Execution

tryDownloading(96);
