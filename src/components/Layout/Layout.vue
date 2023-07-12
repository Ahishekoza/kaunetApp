<template>
    <div>
        <Header :title="title"></Header>
        <main>
            <slot name="headerButton" ></slot>
            <slot name="toggleButton"></slot>
            <slot name="body"></slot>
            <slot name="middleBody"></slot>

            <slot name="displayBody"></slot>
        </main>
        
    </div>
</template>
<script>
import Header from './Header.vue';
export default{
    name: 'Layout',
    props:{
        title:{
            type:String,
        }
    },
    setup(){
        return{

        }
    },
    components:{
        Header
    }

}
</script>
<style>
</style>