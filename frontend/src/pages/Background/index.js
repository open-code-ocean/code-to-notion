import axios from 'axios';
function handleMessage(request) {
  const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };
  getCurrentTab().then((tab) => {
    console.log(tab);
    chrome.tabs.remove(tab.id, function () {});
  });
}
console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.runtime.onMessage.addListener(handleMessage);
