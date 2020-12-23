import axios from '@/js_sdk/gangdiedao-uni-axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import config from '@/common/config.js'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://localhost:10000/mock/9', // url = base url + request url
  baseURL: config.httpDomain, // url = base url + request url
	// baseURL: 'http://192.168.104.129:8080/prod-api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
  //     uni.showToast({
  //       title: res.message || 'error',
		// icon: "none",
  //       duration: 5 * 1000
  //     });
  const html = `<font style="font-size:38px;" color="#ff0000">${res.message}</font>`
  plus.nativeUI.toast(html, {
  	type: 'richtext',
  	verticalAlign: 'center',
  });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        uni.showModal({
          title: '确认退出',
          content: '你已经退出登录，可以取消继续留在该页面，或者重新登录',
          success: function (res) {
            if (res.confirm) {
              store.dispatch('page/user/resetToken').then(() => {
                uni.navigateTo({
                  url: '/pages/login/login'
                });
              })
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
          }
        });
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    uni.showToast({
      title: error.message,
      duration: 5 * 1000
    });
    return Promise.reject(error)
  }
)

export default service
