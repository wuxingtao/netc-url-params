/**
 * @Desc: request
 * @Author: wu xingtao
 * @Date: 2023/5/6
 */
export const getData = async function(url, params = {}) {
  const res = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'cors'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(params)
  })
  return res.json()
}

export const tokenApiList = {
  uat: 'http://ic-appapi-uat.kyslb.com:12306/gatewayapp/ecas/client/getAccessToken',
  stg: 'http://ic-appapi-stg.kyslb.com/gatewayapp/ecas/client/getAccessToken'
}

export const clientMap = {
  H5: 'KY_DELIVERY_WECHAT_APPLET',
  PC: 'KY_PC'
}


