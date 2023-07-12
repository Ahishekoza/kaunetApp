<template>
  <div>

    <!-- The Way  -->
    <!-- <Input
    :model-value="selectedOptions"
    @update:model-value="selectedOptions = $event"
    :options="stringOptions" customWidth="width:550px" /> -->
    <div class="row bbO" :style="{maxWidth:customWidth}">
      <div :class="cfname" >
        <p class="text-weight-bold" style="font-size: 1rem !important; display: flex; justify-content: center; align-items: center; height: 100%;">{{ name }}</p>
      </div>
      <div :class="cfselect">
        <q-select
        square
        filled
        class="bL"
        :model-value="modelValue"
        @update:model-value="$emit('update:model-value',$event)"
        use-input
        emit-value
        map-options
        :multiple="multiple"
        :options="filterOptions"
        options-label="label"
        options-value="value"
        @filter="filterFn"
        @virtual-scroll="onScroll"
        
      />
      </div>
    </div>
  </div>
</template>
<script>
import Button from "./Button.vue";
import { ref } from "vue";


export default {
  name: "Input",
  
  props: {
    modelValue:{
      type: Array,
      default:[]
    },
    customWidth: {
      type: String,
      default: "300px",
    },
    options:{
        type:Array, 
    },
    label:{
      type:String,
      default:"label"
    },
    value:{
      type:String,
      default:"value"
    },
    name:{
      type:String,
      default:"担当者"
    },
    multiple:{
      type:Boolean,
      default:false
    },
    //  class for name
    cfname:{
      type:String,
      default: "col-md-3 col-sm-4"
    },
    // class for select
    cfselect:{
      type:String,
      default: "col-md-9 col-sm-8"
    }
  },
  
  setup(props) {
    const filterOptions = ref(props.options);
    return {
      filterOptions,

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            filterOptions.value = props.options

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          filterOptions.value = props.options.filter(v => 
            v.label.toLowerCase().indexOf(needle) > -1)
        })
      }
    };
  },
  components: {
    Button,
  },
};
</script>
<style scoped>

</style>
