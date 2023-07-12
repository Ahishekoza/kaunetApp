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
    }

}
</script>

<style></style>
