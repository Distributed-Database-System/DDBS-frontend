import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/pages/main/Container'
import Help from '@/pages/main/Help'
import PIListContainer from '@/pages/main/PIListContainer'
import Users from '@/pages/main/Users'
import Rank from '@/pages/main/Rank'
import Articles from '@/pages/main/Articles'
import PICreate from '@/pages/main/PICreate'
import ArticleDetail from '@/pages/main/ArticleDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Container',
      component: Container,
      redirect: '/pi/users',
      children: [
        {
          path: '/pi/create',
          name: 'PICreate',
          component: PICreate,
          meta: {
            title: '新增政策解读'
          }
        },
        {
          path: '/pi/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/pi/rank/:type',
          name: 'Rank',
          component: Rank
        },
        {
          path: '/pi/articles',
          name: 'Articles',
          component: Articles
        },
        {
          path: '/pi/:status',
          name: 'PIList',
          component: PIListContainer,
          meta: {
            title: '政策解读列表'
          }
        },
        {
          path: '/pi/detail/:state/:id',
          name: 'ArticleDetail',
          component: ArticleDetail
        },
        {
          path: '/help',
          name: 'Help',
          component: Help,
          meta: {
            title: '用户手册'
          }
        }
      ]
    }
  ]
})
