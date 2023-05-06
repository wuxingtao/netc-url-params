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



