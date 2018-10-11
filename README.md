# Repo containing projects, tutorials and guides I used when learning how to make chrome extensions

## Links and Resources

- https://developer.chrome.com/extensions


## Notes / Architecture

- Extensions are made of different, but cohesive, components which can include `background scripts`, `content scripts`, an `options page`, `UI elements`

### Manifest

- Chrome extensions start with a `manifest.json` which you can load in `chrome://extensions` using the `LOAD UNPACKED` button

### Background Script

https://developer.chrome.com/extensions/background_pages


**The background script is the extension's event handler; It contains listeners for browser events that are important to the extension**


- Extensions are event based programs used to modify or enhance the Chrome browsing experience
- Events are browser triggers, such as navigating to a new page, removing a bookmark, or closing a tab.
- Extensions monitor these events in their `background script` then react with specified instructions


Some sample events include:

- The extension is first installed or updated to a new version
- The background page was listening for an event which was dispatched
- A content script or other extension `sends a message` https://developer.chrome.com/extensions/messaging
- Another view in the extension, such as a popup, calls `runtime.getBackgroundPage`

**Effective background scripts stay dormant until an event they are listening for fires, react with specified instructions, then unload**

- Background scripts are registered in the `manifest` under the `background` field, are listed in an array under the `scripts` key and `persistent` should be specified as `false`

```
"background": {
   "scripts": ["background.js"],
   "persistent": false
}
```

### UI Elements

An **extension's user interface** should be purposeful and minimal


Most extensions have a `browser action` or `page action`, but can contain other forms of UI, such as:
- `Context menus`: https://developer.chrome.com/apps/contextMenus
- Use of the `omnibox`: https://developer.chrome.com/extensions/omnibox
- Creation of a `keyboard shortcut`: https://developer.chrome.com/extensions/commands


Extension UI pages, such as `popup`, can contain ordinary HTML pages with js logic.


Extensions can also call `tabs.create` or `window.open()` to display additional HTML files present in the extension


An extension using a page action and a popup can use the `declarative content` API to set rules in the background script for when the popup is available to users


When the conditions are met, the background script communicates with the popup to make it's icon clickable to users

### Content Scripts

https://developer.chrome.com/extensions/content_scripts#pi


Extensions that read or write to web pages utilize a `content script`


The content script contains javascript that executes in the contexts of a page that has been loaded into the browser. 


Content scripts read and modify the DOM of web pages the browser visits

- Files that run in the context of web pages
- Using the standard DOM, they are able to read details of the web pages the browser visits, make changes to them and pass information to their parent extension
- Content scripts can access Chrome APIs used by the their parent extension by exchanging `messages` and access information by making `cross-site XMLHttpRequests` to parent sites

### Options Page

https://developer.chrome.com/extensions/options


Enables customization of the extension. Options can be used to enable features and allow users to choose what functionality is relevant to their needs

## Chrome APIs

In addition to having access to the same APIs as web pages, extensions can also use `extension-specific APIs` that create tight integration with the browser


Extensions and webpages can both access the standard `window.open()` method to open a URL, but extensions can specify which window that URL should be displayed in by using Chrome API `tabs.create` method instead

### Asynchronous vs Synchronous methods

Most chrome API methods are async and return immediately without waiting for the operation to finish


If the extension needs to know the outcome of an asynchronous operation it can pass a callback function into the method


#### Example

If the extension needed to navigate the user's currently selected tab to a new URL, it would need to get the current tab's ID and then update that tab's address to the new URL


If `tabs.query` method were synchronous, it may look something like below

```
// THIS CODE DOESN'T WORK!!
var tab = chrome.tabs.query({'active': true});
chrome.tabs.update(tab.id, {url: newUrl});
someOtherFunction();
```

```
// THIS CODE WORKS
chrome.tabs.query({'active': true}, function(tabs){
  chrome.tabs.update(tabs[0].id, {url: newUrl});
});
```

### Different Chrome APIs

https://developer.chrome.com/extensions/api_index

- Storage: https://developer.chrome.com/apps/storage
- DeclarativeContent: https://developer.chrome.com/extensions/declarativeContent


## Communication between pages

Different components in an extension often need to communicate with each other

Different HTML pages can find each other by using the `chrome.extension` methods, such as `getViews()` and `getBackgroundPage()`

Once a page has a reference to other extension pages the first one can invoke functions on the other pages and manipulate their DOMs

Additionally, all components of the extension can access values stored using the `storage` API and communicate through `message passing`

## Saving data and incognito mode

Extensions can save data using the `storage` API, the HTML5 `web storage API`, or by making server requests that result in saving data

When the extension needs to save something, first consider if it's from an incognito window. By default, extensions don't run in incognito windows

*Incognito mode* promises that the window will leave no tracks. When dealing with data from incognito windows, extensions should honor this promise

However extensions can store setting preferences from any window, incognito or not

To detect whether a window is in incognito mode, check the `incognito` property of the relevant `tabs.Tab` or `windows.Window` object

```
function saveTabData(tab) {
  if (tab.incognito) {
    return;
  } else {
    chrome.storage.local.set({data: tab.url});
  }
}
```



