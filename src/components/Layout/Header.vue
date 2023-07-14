<template>
  <div>
    <q-toolbar class="bg-black text-white">
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
      <Button color="deep-orange" label="ログアウト" textColor="white"/>
      
    </q-toolbar>
  </div>
</template>
<script>

import Button from '../Button.vue';
import { ref } from 'vue';
export default{
    name:'Header',
    components:{
        Button
    },
    
    setup(){
      
       return{
           
       }
   },

   beforeCreate(){

   const  user = JSON.parse(localStorage.getItem('kaunet_user_data'));

   },

    props:{
      title:{
        type:String,
        default:()=> "KOLOR-FIX"
      }
    }
    

}
</script>

<style></style>
