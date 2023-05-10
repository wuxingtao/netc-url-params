/**
 * @Desc: content
 * @Author: wu xingtao
 * @Date: 2023/5/6
 */
console.log('content.js success')

const urlQueryStringAdd = (url,str) =>{
  if(!str){
    return url
  }
  return `${url}${url.indexOf('?')<0 ? '?':'&'}${str}`
}

// 返回url参数对象
const getQueryObject = (url = '') => {
  url = url ? url : window.location.href
  url = window.location.hash ? (url.split('#')[0] || '') : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// params参数转url参数
const paramsToUrlStr = (params) => {
  let arr = []
  Object.keys(params).forEach((item)=>{
    arr.push(`${item}=${params[item] || ''}`)
  })
  return arr.join('&')
}

/**
 * url拼接对象参数
 * @param url
 * @param paramData {}
 * @returns {string}
 */
const urlContact =  (url,paramData)=>{
  const urlFragment = window.location.hash ? (url.split('#')[1] || '') : url
  return  url + (urlFragment.indexOf('?')<0  ? '?': '&') + paramsToUrlStr(paramData)
}

// get popup2content info
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('accessToken',request.accessToken)
  sendResponse('我收到了你的accessToken')
  if(request.accessToken){
    // 当前页面路由
    const href = window.location.href
    // 适配摩天轮mock链接
    const originPath = href.indexOf('envId') > 0 ? href : href.split('?')[0]
    // 重组query
    const queryObject = Object.assign(getQueryObject(),{token:request.accessToken})
    window.location.href = urlContact(originPath, queryObject)
    // 处理hash路由刷新
    if(window.location.hash){
      window.location.reload()
    }
  }

})
