<template>
    <div :class="[itemsArray.length ? 'displayToast' : 'displayNAN']">
        <q-card style="height: 270px; width: 500px">
            <q-card-section style="margin: 0 auto">
              <div class="text-h6">{{label}}</div>
            </q-card-section>
            <q-separator style="width: 90%; margin: 0 auto" />
            <q-card-section
              v-if="show"
              class="scrollbar"
            >
              <div class="column items-start content-start">
                <slot></slot>
              </div>
            </q-card-section>
            <q-card-actions align="right" >  
              <slot name="button"></slot>
            </q-card-actions>
            
          </q-card>
    </div>
</template>
<script>
export default{
    name:"Toast",
    props:{
        label:{
            type:String,
            default:''
        },
        show:{
            type: Boolean,
            default: false
        },
        itemsArray:{
            type: Array,
            default: []
        }
    },
    

}
</script>