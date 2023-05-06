/**
 * @Desc: popup
 * @Author: wu xingtao
 * @Date: 2023/5/6
 */
const submitBtn = document.querySelector('#submit')
const phoneInput = document.querySelector('#phone')
const envTarget = document.querySelector('input[name="env"]:checked')
console.log('popup')

// popup表单默认值
const formDefault = {
  phone: '13569448500',
  env: 'uat'
}
/* 初始化popup表单数据*/
window.onload = function(){
  chrome.storage.local.get('netc-plugins_option_phone',function(result){
    console.log('onload',result['netc-plugins_option_phone'])
    phoneInput.value = result['netc-plugins_option_phone'] || formDefault.phone
  })
  chrome.storage.local.get('netc-plugins_option_env',function(result){
    envTarget.value = result['netc-plugins_option_env'] || formDefault.env
  })
}

submitBtnClick = ()=>{
  console.log('phone',phoneInput.value)
  chrome.storage.local.set({'netc-plugins_option_phone': phoneInput.value, function(result){
      console.log('phone set',result)
    }})
  chrome.storage.local.set({'netc-plugins_option_env': envTarget.value})

}
submitBtn.addEventListener('click',submitBtnClick)
