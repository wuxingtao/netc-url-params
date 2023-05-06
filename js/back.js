/**
 * @Desc: back 后台配置页
 * @Author: wu xingtao
 * @Date: 2023/5/6
 */
chrome.contextMenus.create({
  title: "自动搜索",
  onclick: function () {
    chrome.tabs.executeScript(null, {
      code: `
                var kw = document.querySelector('#kw');
                kw.value = 'java';
                var but = document.querySelector('#su');
                but.click()
            `
    })
  }
})
