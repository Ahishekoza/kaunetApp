import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from  '../components/Auth/Register.vue'
import InputTable from '../components/Table/InputTable.vue'
import { authApi } from '@/services/apiCreation'
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
    // beforeEnter: guardRoute,
    component: InputTable
  },
]


async function guardRoute (req,res,next){
  if(localStorage.getItem('kaunet_user_data') && localStorage.getItem('kaunet_user_token')){
     await authApi({token:localStorage.getItem('kaunet_user_token')}).then((response)=>{
      if(response.data.message === "OK"){
        next()
      }
     }).catch((error)=>{
      alert(`Error: ${error.message}`)
      next({name: 'home'})
     }) 
   
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
