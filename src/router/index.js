import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from  '../components/Auth/Register.vue'
import InputTable from '../components/Table/InputTable.vue'
import { getSession } from '@/session'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/main',
    name: 'InputTable',
    beforeEnter: guardRoute,
    component: InputTable
  },
]


function guardRoute (req,res,next){
  if(localStorage.getItem('kaunet_user_data')){
    console.log("hi")
    next()
  }
  else{
    next({name: 'home'})
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
