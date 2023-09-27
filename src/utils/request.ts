//进行axios二次封装:使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关仓库
import useUserStore from '@/store/modules/user'
//1、使用axios对象的create方法,创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径带上此/api
  timeout: 5000, //超时时间
})

//2、request实例添加请求与响应拦截器
//请求拦截器
request.interceptors.request.use((config) => {
  //获取用户相关小仓库:获取仓库内部token,登陆成功后携带给服务器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  //config配置对象,header属性请求头,经常给服务器携带公共参数
  //返回配置对象
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调,返回的服务器的数据
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调,处理http网络错误的
    //定义变量:存储网络错误信息
    let message = ''
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      case 502:
        message = '网关错误'
        break
      case 503:
        message = '服务不可用'
        break
      case 504:
        message = '网关超时'
        break
      default:
        message = '网络出现错误'
        break
    }
    ElMessage({
      type: error,
      message,
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default request
