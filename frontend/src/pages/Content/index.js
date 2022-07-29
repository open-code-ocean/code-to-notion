import { leetloader, notionCallBack } from './modules/Leetcode';

if (window.location.host === 'localhost:5000') {
  const link = window.location.href;
  const code = link.match(/\?code=([\w\/\-]+)/)[1];
  console.log(code);
  console.log(notionCallBack(code));
//   chrome.runtime.sendMessage({
//     type: 'leetcode',
//     code: code,
//     closeCurrentTab: true,
//   });
}
