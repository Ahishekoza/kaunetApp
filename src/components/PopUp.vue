<template>
  <div>
    <div class="row " >
      <q-card style="width: 500px; height: fit-content; display: block" v-bind="$attrs">
        <q-card-section>
          <div class="text-right">
            <q-btn  flat rounded icon="close" @click='handleClose'></q-btn>
          </div>
            <h7  class="text-weight-bold"><span>{{ name }}</span> 検索</h7>
        </q-card-section>
        <q-card-section
          ><q-input 
          :model-value="modelValue" 
          @update:model-value="$emit('update:modelValue',$event)" 
          outlined 
          type="text" 
          dense="false">
        </q-input>
        </q-card-section>
        <q-separator dark />
        <q-card-actions vertical align="right">
          <q-btn color="cyan" glossy  text-color="black" style="font-weight: bold;" @click="handlePopUp" >検索</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: "PopUp",
  props: {
    searchValue:{
        type:String,
        default:'ButtonClicked'
    },
    modelValue:{
      type:String,
    },
    handlePopUp:{
      type:Function,
    },
    handleClose:{
      type:Function
    }
  },
  
  computed:{
    ...mapState([
      'name'
    ])
  }
  
};
</script>
<style></style>
