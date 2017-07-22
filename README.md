These scripts will add all 2446 animations to your account from the old Mixamo Store (before the 22nd of August, 2017 - while assets are/were free) and make downloading easy.

## Notes
- To speed things up, change the products per page filter to '96 Per page' (found to the far-right of the search bar).
- It might also help to change to 'Small Thumbnails' instead of the default of 'Medium Thumbnails', this can be selected via the settings icon (the cog icon to the far-right of the search bar and drop-down filters).
- *The store states 2464 results - 18 of these are animation packs which are not added because **the animations within each pack are individually added** to your account (resulting in adding and downloading 2446 animations).*

## Adding Animations to Account

- Go to https://www.mixamo.com/store/#/search?page=1
- Log in on your account, if you aren't already logged in (look at the top-right corner).
- While on the page, open the chrome console:
  - press F12 on your keyboard
  - click on the 'Console' tab in the new side-window that opens
  - in the 'Filter' field at the top, make sure to type 'VM' (without quotes) so that you can read the script logs (and any unlikely errors).  *Mixamo outputs a lot of info and errors that you do not need to see or care about.*
- Paste **MixamoAddAnimations.js** (as text or as a file) into the console  
*https://github.com/ConflictedDev/MixamoAnimationsDownload/blob/master/mixamoAddAnimations.js*
- Push enter to start executing the script

The script should run, after you have pushed enter, until it gets to the end of the last page.

On completion, the console will display the number of animations that were newly added to your account and the number of animations that were already owned on your account.

***NOTE:** Close the BROWSER TAB once this is done (or if you wish to stop the script) - the console does not remove code from the virtual machine it uses for the browser tab.  
Also, executing another script in the same tab will likely result in weird things happening due to conflicts.*


## Downloading Animations

This still requires manual interaction as writing a complete automation script for this would have taken too long and likely be error-prone.  
Therefore, I have only made a basic script for this so that it is less painful for you to download the animations.  

**Make sure your browser's settings are set to download multiple files at once** *(for Chrome - if you haven't set this before, you should get a pop-up notification asking if you want to allow Mixamo the ability to download multiple files - say yes).*

### Step 1
- Go to https://www.mixamo.com/store/#/assets/my-animations
- Log in on your account, if you aren't already logged in (look at the top-right corner; *if you were redirected because you weren't logged in, go to the link above again*).
- While on the page, open the chrome console:
  - press F12 on your keyboard
  - click on the 'Console' tab in the new side-window that opens
  - in the 'Filter' field at the top, make sure to type 'VM' (without quotes) so that you can read the script logs (and any unlikely errors).  *Mixamo outputs a lot of info and errors that you do not need to see or care about.*
- Paste **MixamoDownloadQueued.js** (as text or as a file) into the console ***(this only needs to be done once for the entire repeated process!)***  
*https://github.com/ConflictedDev/MixamoAnimationsDownload/blob/master/mixamoDownloadQueued.js*
- Push enter to add the javascript to the console's VM

### Step 2
- Click the checkbox in the top-left corner to select all animations on the current page
- Click the 'QUEUE DOWNLOAD' button in the top-right corner
- A form should open for choosing your download settings:
  - I recommend downloading animations **without skins**. To work out what settings you want, read about them via https://community.mixamo.com/hc/en-us/articles/207260797-Mixamo-Store-Download-Guide
  - **make sure to set the appropriate settings on each page as it does not save settings when going to the next page!**

### Step 3
- While animations are queuing, you should be automatically redirected to the 'Downloads' page
- Whether queuing is in progress or has finished, write **tryDownloading(96);** into the console and push enter  
('96' stands for the number of selected downloads on the page - this depends on the 'Per page' filter in the top-right corner)  
**NOTE: If you are on the last page and your filter is set to 96 Per page, you will want to write tryDownloading(46); instead as there will only be 46 animations left.**

### Step 4
- Once downloads are ready, a console message should state how many downloads were started - **this is not confirming completion!** Make sure to wait for the downloads to complete as well
- Once the downloads have finished (I recommend checking your download folder to make sure everything downloaded successfully) you will want to do the following:
  - click the checkbox in the top-left corner to select all animations on the download page
  - click the 'REMOVE' button in the top-right corner, then press 'OK' on the confirmation window that opens
  - *(this reduces lag in Mixamo and avoids working out which files you have previously downloaded)*

### Step 5
- Click on the 'My Animations' tab in the top-left corner
- Navigate to the next page in 'My Animations' (the page after the last one you queued downloads for)  
*(you can state the page via the url rather than clicking through the tabs. For example, to go to page 10 - https://www.mixamo.com/store/#/assets/my-animations?page=10)*
- Repeat Steps 2, 3 and 4 until you have gone through all pages  
**NOTE:** You can click in the console window and use the **up-arrow key** on your keyboard to get previously typed commands - this is especially useful instead of typing startDownloading(96); every time.


## Additional Notes

- I recommend putting the downloaded files on your computer into separate folders based on each page (this can be done after downloading everything and using order-by-date).  This will make it easier to distinguish what each animation with the same name is (as a lot of the animations do not have unique names).
- In relation to the point above, I recommend taking screenshots of each page so that you can use the thumbnail displays as a reference - this is because the pages will be removed after the store updates.  I have a folder on my google drive (https://goo.gl/5D44nA) of the screenshots I made; though, I cannot guarantee my pages will be in the same order as yours so you will need to confirm that.
- Here is a a little reference table (https://goo.gl/ox97gu) for total number of downloads per page if you are downloading to the same folder and are checking to ensure downloads were successful.
