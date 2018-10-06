# Repo containing projects, tutorials and guides I used when learning how to make chrome extensions

## Links and Resources

- https://developer.chrome.com/extensions


## Notes

- Extensions are made of different, but cohesive, components which can include `background scripts`, `content scripts`, an `options page`, `UI elements`

### Manifest

- Chrome extensions start with a `manifest.json` which you can load in `chrome://extensions` using the `LOAD UNPACKED` button

### Background Script

https://developer.chrome.com/extensions/background_pages


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

## Chrome APIs

- Storage: https://developer.chrome.com/apps/storage
- DeclarativeContent: https://developer.chrome.com/extensions/declarativeContent
