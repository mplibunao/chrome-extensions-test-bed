'use strict';

// Extension needs a persistent variable as soon as installed
// Include a listening event which sets a value using the `storage` API
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function () {
    console.log('The color is green');
  });
  // Add declared rules with the `declarativeContent` API
  // to show page action when condition is met
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
