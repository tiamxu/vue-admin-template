//统一管理项目用户相关接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'
//统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//暴露请求函数
//登陆接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, any>(API.LOGIN_URL, data)
//获取用户信息
export const reqUserInfo = () =>
  request.get<any, loginResponseData>(API.USERINFO_URL)
//退出登陆
export const reqLogout = () =>
  request.post<any, userInfoResponseData>(API.LOGOUT_URL)
