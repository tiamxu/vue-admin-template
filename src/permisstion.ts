//路由鉴权: 鉴权 项目当中路由能不能被访问权限的设置(什么条件下能访问，什么条件下不能访问)
import router from '@/router'
import setting from './setting'
//引入进度条插件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关小仓库内部token数据，用于判断用户是否登陆成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userStore = useUserStore(pinia)
//全局守卫:项目当中任意路由都会触发的钩子
//全局前置守卫:
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  //to:你将要访问那个路由
  //from: 你从那个路由来
  //next: 路由的放行函数
  //访问某个路由之前守卫
  nprogress.start()
  //获取token
  const token = userStore.token
  //用户名
  const username = userStore.username
  if (token) {
    //登陆成功,访问login不能访问,要指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //登陆成功可以访问除login外路由
      //有用户信息
      if (username) {
        next() //放行
      } else {
        //无用户信息
        try {
          //获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          //token过期:获取不到用户信息
          //用户手动修改本地存储token
          //退出登陆:
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登陆
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

//路由进度条业务:nprogress
