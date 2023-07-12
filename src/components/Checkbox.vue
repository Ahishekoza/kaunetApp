<template>
    <div>
        <div class="row bbO" style="height: 67px;">
            <div class="col-md-3 col-sm-2 row justify-center items-center bR" >
                <p class="text-weight-bold q-my-xs" style="line-break: strict; font-size: 1rem !important;">{{ name }}</p>
            </div>
            <div class="col-md-9 col-sm-10 ">
                <q-option-group
                size="xs"
                style="display: flex; justify-content: center; align-items: center; height: 100%; font-size: 0.9rem !important; font-weight: 600 !important;"
                :options="options"
                type="checkbox"
                inline
                :model-value="modelValue"
                @update:model-value="$emit('update:modelValue',$event)"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'CheckBox',
    props:{
        customWidth:{
            type:String,
            default:'400px'
        },
        name:{
            type:String,
            default:"商品区分"
        },
        options:{
            type:Array,
            default:[]
        },
        modelValue:{
            type:Array,
            default:[]
        }
    }
}
</script>
<style>

</style>