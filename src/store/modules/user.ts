//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import { UserState } from './types/type'
//引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute } from '@/router/routes'
//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一表示token
      menuRoutes: constantRoute, //存储仓库生成菜单需要数组(路由)
      username: '',
      avatar: '',
    }
  },
  //异步|逻辑地方
  actions: {
    //用户登陆方法
    async userLogin(data: any) {
      //登陆请求
      const result: any = await reqLogin(data)
      console.log(result)
      //登陆请求:成功200-> 记录token
      //登陆请求:失败201-> 登陆失败错误提示信息
      if (result.code === 200) {
        //pinia仓库存储token
        //由于pinia|vuex存储数据其实是利用js对象
        this.token = result.data as string //类型断言
        // localStorage.setItem('TOKEN', result.data.token as string)
        SET_TOKEN(result.data as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库中
      const result: any = await reqUserInfo()
      console.log(result)
      if (result.code === 200) {
        //获取用户成功,存储下信息
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登陆
    async userLogout() {
      const result: any = await reqLogout()
      console.log(result)
      //目前没有mock接口:退出登陆接口(通知本地用户唯一标识失效)
      if (result.code === 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
