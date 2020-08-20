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
// Vue.use(Message);

// 绑定到原型
Vue.prototype.$axios = axios;

//设置默认的 api 域名基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.defaults.baseURL = 'http://liangwei.tech:3000'

Vue.config.productionTip = false;

// 路由守卫,所有的跳转都会被拦截经过这里；
router.beforeEach((to, from, next) => {
  // 是否有token
  const hasToken = localStorage.getItem("token");
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
  if (to.path != '/login') {
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
});

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  //config中保存了每次请求的各种具体信息，url，data，method等参数；

  // console.log(config);
  // console.log(config.url);
  //若是登录页是不带token值的
  if (localStorage.getItem('token') && !config.headers.Authorization) {
    //自动带上token值；
    config.headers.Authorization = 'Bearer ' + localStorage.getItem("token")
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')