<template>
  <div>
    <!-- <InputTable/> -->
    <!-- <Register/> -->
   <Login/>

  </div>
</template>

<script>
import InputTable from '@/components/Table/InputTable.vue';
import Register from '@/components/Auth/Register.vue';
import Login from '@/components/Auth/Login.vue';
export default {
  name: "HomeView",
  components:{
    InputTable,
    Register,
    Login
  }
};
</script>
