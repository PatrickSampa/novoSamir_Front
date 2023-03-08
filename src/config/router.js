import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/pages/Login'
import Cadastrar from '@/pages/Cadastrar'
import Processos from '@/pages/Processos'
import Home from '@/pages/Home'

// import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'cadastrar',
    path: '/cadastrar',
    component: Cadastrar
  },
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'processos',
    path: '/processos',
    component: Processos
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)

//     if(to.matched.some(record => record.meta.requiresAdmin)){
//         const user = JSON.parse(json)
//         user && user.admin ? next() : next({ path: '/' })
//     } else {
//         next()
//     }
// })

export default router
