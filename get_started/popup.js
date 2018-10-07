'use strict';

let changeColor = document.getElementById('changeColor');

/**
   Grabs the button from `popup.html` and requests the color
   value from storage which it applies as the background of the button
**/

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

// Adds an onClick event handler which triggers a `programatically injected **content script**`
// NOTE: onclick is not onClick!!!
changeColor.onclick = function(element) {
  let color = element.target.value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};
