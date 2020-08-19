import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'


Vue.use(VueRouter)

const routes = [
  //登录页面;
  {
    path: '/login',
    components: {
      login
    }
  }

]

const router = new VueRouter({
  routes
})

export default router