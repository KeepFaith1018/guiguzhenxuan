// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { constantRoute } from '@/router/routes'
let useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        // 本地存储
        localStorage.setItem('TOKEN', result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息
    async userInfo() {
      // 获取用户信息进行存储仓库中[用户头像,名字]
      let result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      } else {
      }
    },
    // 退出登录
    userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      localStorage.removeItem('TOKEN')
    },
  },
  getters: {},
})
// 对外默认暴露
export default useUserStore
