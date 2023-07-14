<template>
    <div>
        <Layout>
            <template v-slot:body>Register</template>
        </Layout>
    </div>
</template>
<script>
import Layout from "@/components/Layout/Layout.vue";
import Button from "@/components/Button.vue";
import { authApi } from "../../services/apiCreation";
import { User } from "../../InputClass";
import { ref } from "vue";
export default {
    name: 'Login',
    components:{
        Layout
    }
}
</script>