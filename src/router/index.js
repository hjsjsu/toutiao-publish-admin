import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Layout from '../views/layout'
import Article from '../views/article'
import Publish from '../views/publish'
import Image from '../views/material'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Layout,
    children: [{
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: 'article',
      name: 'Article',
      component: Article
    },
    {
      path: 'publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: 'image',
      name: 'Image',
      component: Image
    }]
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const user = window.localStorage.getItem('user')
  if (to.path !== '/login') {
    if (user) {
      return next()
    } else {
      return next('/login')
    }
  } else {
    return next()
  }
})

export default router
