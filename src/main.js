import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
// 引入 ui 库
import ElementUI from 'element-ui';
// 引入 css
import 'element-ui/lib/theme-chalk/index.css';
import {
  Message
} from 'element-ui';

//Element-UI 注册组件库
Vue.use(ElementUI);
//引入提示组件库;
Vue.use(Message);

// 绑定到原型
Vue.prototype.$axios = axios;

//设置默认的 api 域名基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.baseURL = 'http://liangwei.tech:3000'

Vue.config.productionTip = false;

// 路由守卫,所有的跳转都会被拦截经过这里；
router.beforeEach((to, from, next) => {
  // 是否有token
  const hasToken = localStorage.getItem("Authorization");
  // console.log(to);
  // console.log(from);
  // 是否是个人中心页

  //判断是否要守卫的方法一；
  // const pageNeedAuth = ['/mycenter', '/edit'];
  // //只要to.path存在在这个数组中，则表示需要守卫的路由;
  // if (pageNeedAuth.indexOf(to.path) >= 0) {
  //   //判断是否有token
  // }

  //方法二：
  //to.meata.pageNeedAuth//查找路由元信息；
  if (to.path === '/') {
    if (hasToken) {
      return next();
    } else {
      Message({
        message: 'ログインくださいねー',
        type: 'warning'
      });
      return router.push("/login").catch(err => console.log(err))
    }
  }

  next();
})

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')