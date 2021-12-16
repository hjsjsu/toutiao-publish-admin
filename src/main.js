import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载 element 组件库
import ElementUI from 'element-ui'

// import { ElementTiptapPlugin } from 'element-tiptap'
// import element-tiptap 样式

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// import element-tiptap 样式
import 'element-tiptap/lib/index.css'

// 加载全局样式
import './styles/index.less'

Vue.use(ElementUI)
// 安装 element-tiptap 插件
// Vue.use(ElementTiptapPlugin, { /* 插件配置项 */lang: 'zh' })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
