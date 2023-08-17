import { createApp } from 'vue'
// 引入element插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// svg所需的配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象:注册整个项目全局对象
import gloablComponent from '@/components/index'
// 配置国际化
//@ts-ignore 用代码注释修补
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入模板的全局样式文件
import '@/styles/index.scss'
// 此处出现报错的原因是因为,element-plus没有在这里ts的类型
import App from './App.vue'
// 引入路由进行注册
import router from '@/router/index'
// 引入pinia
import pinia from '@/store/index'

// 获取应用实例对象
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
// 注册模板路由
app.use(router)
app.use(gloablComponent)
app.use(pinia)
app.mount('#app')
