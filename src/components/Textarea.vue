<template>
  <div class="row">
    <!-- @TODO: --- we have to repeat the same process in every component where we import TextArea -->
    <!-- <Textarea :model-value="inputValues" @update:model-value="inputValues=$event"/> -->

    <!-- computed:{
    handleArray(){
      return this.inputValues.split(',\n')
    }
  } -->

    <!-- Class Before button and After button is changed because even if specific Textarea doesn't have button with it , 
    it was Taking the space for button -->
    <div
      :class="[
        showButton
          ? 'row bbO col-md-9 col-sm-6'
          : 'row bbO col-md-12 col-md-12',
      ]"
      :style="{ maxWidth: customWidth }"
    >
    <!-- row justify-center items-center
row justify-center items-center -->
      <div :class="[name.length>6?'col-md-3 col-sm-6  ':'col-md-2 col-sm-6  ']">
        <p class="text-weight-bold q-mt-xs q-px-xs" style="line-break: strict; font-size: 0.9rem !important; display: flex; justify-content: start; align-items: center; height: 100%;">{{ name }}</p>
      </div>
      <div :class="[name.length>6? 'col-md-9 col-sm-6':'col-md-10 col-sm-6']" :style="{ maxWidth: customWidth }">
        <q-input
          :class="['bL','fsizetextarea']"
          filled
          square
          :model-value="modelValue"
          @update:model-value="$emit('update:model-value', $event)"
          type="textarea"
        >
        </q-input>
      </div>
    </div>
    <div
      :class="[
        showButton
          ? 'col-md-3 col-sm-6  row justify-center items-center q-mt-lg'
          : ' row justify-center items-center q-mt-lg',
      ]"
      v-if="showButton"
    >
      <Button
        label="あいまい検索"
        color="cyan"
        textColor="black"
        InputClass="bfsize"
        :handleEffect="handlePopUp"
      />
    </div>
  </div>
</template>
<script>
import Button from "./Button.vue";
export default {
  name: "Textarea",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    customWidth: {
      type: String,
      default: "700px",
    },
    name: {
      type: String,
      default: "商品区分",
    },
    showButton: {
      type: Boolean,
      default: false,
    },
    
    
  },

  setup(){
    
    return {
     
    }
  },

  components: {
    Button
  },

  methods:{
    // -- This functions takes the name and store it has a state
    handlePopUp() {
      this.$store.dispatch('setShowUp',true)
      this.$store.dispatch('setName',this.name)
    },
  }
};
</script>
<style></style>
