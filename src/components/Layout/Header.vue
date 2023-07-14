<template>
  <div>
    <q-toolbar class="bg-black text-white">
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
      <div v-if="user">
      Welcome , {{ user.担当者 }}
      <Button color="deep-orange" :handleEffect="handleLogout" label="ログアウト" textColor="white"/>
      </div>
      <div v-else>
        <Button color="deep-orange" :handleEffect="handleLogin"  label="ログイン" textColor="white"/>
      </div>
    </q-toolbar>
  </div>
</template>
<script>

import Button from '../Button.vue';
export default{
    name:'Header',
    components:{
        Button
    },
    props:{
      title:{
        type:String,
        default:()=> "KOLOR-FIX"
      }
    },
    setup(){
       
        return{
            
        }
    },
    computed:{
      user(){
        const user =  localStorage.getItem('kaunet_user_data')
        return user ? JSON.parse(user) : 'KO'
      }
    }

}
</script>

<style></style>
