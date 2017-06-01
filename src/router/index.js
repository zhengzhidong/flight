import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import List from '@/page/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
