import axios from 'axios'
import {
  Toast
} from 'vant' // vant的提示组件
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'xxx' : 'xxx' // 请求路径
axios.defaults.withCredentials = true // 表示跨域请求是是否需要使用凭证   true / false
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || '' // 请求头是否携带token
axios.defaults.headers.post['Content-Type'] = 'application/json' // post请求常见的数据格式（content-type）

/* 
    post请求常见的数据格式（content-type）   参考链接：https://www.cnblogs.com/dreamcc/p/10752604.html

    Content-Type: application/json ： 请求体中的数据会以json字符串的形式发送到后端
    Content-Type: application/x-www-form-urlencoded：请求体中的数据会以普通表单形式（键值对）发送到后端
    Content-Type: multipart/form-data： 它会将请求体的数据处理为一条消息，以标签为单元，用分隔符分开。既可以上传键值对，也可以上传文件。
*/

axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization

/* 
  拦截器：

  应用场景：
  1：每个请求都带上的参数，比如token，时间戳等。
  2：对返回的状态进行判断，比如token是否过期
*/

// 请求拦截器
axios.interceptors.request.use(config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = window.localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          Toast.fail("身份验证失败，请关闭重新进入。");
          break;

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Toast.fail("登录过期，请关闭重新进入。");
          // 清除token
          break;

          // 404请求不存在
        case 404:
          Toast.fail("您访问的网页不存在。");
          break;
          // 其他错误，直接抛出错误提示
        default:
          Toast.fail(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);

/* 
  axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
      Toast.fail('服务端异常！')
      return Promise.reject(res)
    }
    if (res.data.resultCode != 200) {
      if (res.data.message) Toast.fail(res.data.message)
      if (res.data.resultCode == 416) {
        router.push({ path: '/login' })
      }
      return Promise.reject(res.data)
    }

    return res.data
  })
*/

export default axios