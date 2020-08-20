import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import backEnd from '../views/backEnd.vue'
import publishPage from '../views/publishPage.vue'
import newsLists from '../views/newsLists.vue'


Vue.use(VueRouter)

const routes = [
  //登录页面;
  {
    path: '/login',
    components: {
      login
    }
  },
  {
    path: '/backEnd',
    components: {
      backEnd
    },
    meta: {
      breadcrumb: '后台'
    },
    children: [{
      //子路由不写斜杠
      path: 'publishPage',
      component: publishPage,
      meta: {
        breadcrumb: '文章编辑'
      }
    }, {
      path: 'newsLists',
      component: newsLists,
      meta: {
        breadcrumb: '新闻列表'
      }
    }]
  }

]

const router = new VueRouter({
  routes
})

export default router