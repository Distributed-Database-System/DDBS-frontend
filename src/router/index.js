import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/pages/main/Container'
import Users from '@/pages/main/Users'
import Rank from '@/pages/main/Rank'
import Articles from '@/pages/main/Articles'
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
          path: '/pi/detail/:state/:id',
          name: 'ArticleDetail',
          component: ArticleDetail
        }
      ]
    }
  ]
})
