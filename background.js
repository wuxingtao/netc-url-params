/**
 * @Desc: background
 * @Author: wu xingtao
 * @Date: 2023/5/6
 */
import { getData } from './js/request.js'
//

const getToken = function(phone) {
  getData('http://ic-appapi-uat.kyslb.com:12306/gatewayapp/ecas/client/getAccessToken', {
    'clientTag': 'KY_DELIVERY_WECHAT_APPLET',
    'phone': phone
  }).then(res => {
    console.log(res)
    if(res.code === 0 && res.data){
      // window.location.href = window.location.href + `?token=${res.data.accessToken}`
      // 通信background=>content
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        let message = {
          accessToken: res.data.accessToken
        }
        chrome.tabs.sendMessage(tabs[0].id, message, res => {
          console.log('background=>content')
          // console.log(res)
        })
      })
    }
  })
}



// 右键一级菜单
chrome.contextMenus.create({
  title: '页面添加token',
  id: 'editHtml',
  contexts: ['all'],
  type: 'normal' // "normal", "checkbox", "radio", "separator"
}, () => {
  console.log('contextMenus are created.')
})

// 监听右键菜单被点击事件
chrome.contextMenus.onClicked.addListener((menuInfo, tabInfo) => {
  // 菜单信息，具体内容请自行查看调试窗口的调试日志
  console.log('menuInfo:', JSON.stringify(menuInfo))
  // 页面信息，具体内容请自行查看调试窗口的调试日志
  console.log('tabInfo:', JSON.stringify(tabInfo))
  chrome.storage.local.get('netc-plugins_option_phone', function(result) {
    console.log('netc-plugins_option_phone', result['netc-plugins_option_phone'])
    getToken(result['netc-plugins_option_phone'])
  })
/*  chrome.tabs.query({
    active: true, currentWindow: true
  }, (tabs) => {
    // 页签信息，具体内容请自行查看调试窗口的调试日志
    console.log('tabs:', JSON.stringify(tabs))
    // 向当前页签（即tabs[0]）发送消息
    chrome.tabs.sendMessage(tabs[0].id,
      {
        menuInfo: menuInfo,
        tabInfo: tabInfo,
        msg: 'msg from background'
      },
      (res) => {
        console.info(JSON.stringify('res:', res))
        if (res) {
          // 发送系统通知
          chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: 'notifications.png',
            title: '出错！！!',
            message: '开启页面编辑出错！！!' + JSON.stringify(res)
          })
          return
        }
        // 发送系统通知
        chrome.notifications.create('reminder', {
          type: 'basic',
          iconUrl: './notifications.png', // 通知使用的图标
          title: (menuInfo.menuItemId == 'editHtmlOn' ? '已开启' : '已关闭') + '编辑功能', // 通知标题，一定要有内容，哪怕是空字符串，否则不会发送通知
          message: '当前页面已' + (menuInfo.menuItemId == 'editHtmlOn' ? '开启' : '关闭') + '编辑功能' // 通知内容，一定要有内容，哪怕是空字符串，否则不会发送通知
        })
      })
  })*/
})
