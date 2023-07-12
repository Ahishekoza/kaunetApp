<template>
  <!-- @TODO:- width should be same -->
  <div >
    <q-btn 
    glossy
    :disable="disable"
    no-caps
    :color="color" 
    :label="label" 
    :text-color="textColor" 
    :class="[InputClass]" 
    v-bind="$attrs"
    v-on:click="handleEffect"/>
  </div>
</template>
<script >
export default{
 name:"Button",
 props:{
  color:{
    type:String,
    default:"cyan"
  },
  label:{
    type:String
  },
  textColor:{
    type:String,
    default:"black"
  },
  InputClass:{
    type:String,
    default:""
  },
  handleEffect:{
    type:Function
  },
  customWidth:{
    type:String
  },
  disable:{
    type:Boolean,
    default:false
  }
 },

 
  
}
</script>

<style >

</style>
