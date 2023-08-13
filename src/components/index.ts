import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';// 引入类型
const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}