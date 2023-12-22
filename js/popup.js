/**
 * @Desc: popup
 * @Author: wu xingtao
 * @Date: 2023/5/6
 */
const submitBtn = document.querySelector('#submit')
const phoneInput = document.querySelector('#phone')

// popup表单默认值
const formDefault = {
  phone: '13569448500',
  env: 'uat',
  client: 'H5'
}

/* 增加手机号监听 */
phoneInput.addEventListener('input', handlePhoneInput)

function handlePhoneInput (e) {
  console.log(e)
  let targetValue = e.target && e.target.value
  if (targetValue && targetValue.length > 11) {
    e.target.value = targetValue.slice(0, 11)
  }
}

/* 初始化popup表单数据*/
window.onload = function() {
  chrome.storage.local.get('netc-plugins_option_phone', function(result) {
    console.log('onload', result['netc-plugins_option_phone'])
    phoneInput.value = result['netc-plugins_option_phone'] || formDefault.phone
  })
  chrome.storage.local.get('netc-plugins_option_env', function(result) {
    const currentEnv = result['netc-plugins_option_env'] || formDefault.env
    document.querySelector(`input#${currentEnv}`).checked = true
  })
  chrome.storage.local.get('netc-plugins_option_client', function(result) {
    const currentEnv = result['netc-plugins_option_client'] || formDefault.client
    document.querySelector(`input#${currentEnv}`).checked = true
  })
}
/* 保存按钮事件 */
const submitBtnClick = () => {
  const envTarget = document.querySelector('input[name="env"]:checked')
  const clientTarget = document.querySelector('input[name="client"]:checked')
  chrome.storage.local.set({ 'netc-plugins_option_env': envTarget.value })
  chrome.storage.local.set({ 'netc-plugins_option_client': clientTarget.value })
  chrome.storage.local.set({
    'netc-plugins_option_phone': phoneInput.value, function (result) {
      console.log('phone set', result)
    }
  })

  console.log('phone----', phoneInput.value)
  console.log('env----', envTarget.value)
  getToken(phoneInput.value, envTarget.value, clientTarget.value)
  window.close()
}
submitBtn.addEventListener('click', submitBtnClick)

function getToken (phone, env, client) {
  // const bg = chrome.extension.getBackgroundPage()
  // bg.getToken(phone, env)

  // 获取token
  sendMessage({ key: 'getToken', data: { phone, env, client } })
}

/**
 * 通信消息发送
 * @param message
 */
function sendMessage (message) {
  //for sending a message
  chrome.runtime.sendMessage(message, function(response) {
    console.log('response', response)
  })
}
