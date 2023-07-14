<template>
  <div>
    <!-- <InputTable/> -->
    <Register/>
  </div>
</template>

<script>
import InputTable from '@/components/Table/InputTable.vue';
import Register from '@/components/Auth/Register.vue';
export default {
  name: "HomeView",
  components:{
    InputTable,
    Register
  }
};
</script>
