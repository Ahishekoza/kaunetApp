<template>
  <div>
    <Layout>
      <template v-slot:body>
        <div class="row justify-center items-center">
          <q-card style="height: 400px; width: 500px" class="q-my-md bg-grey-6">
            <q-card-section>
              <div class="text-h5">ログイン</div>
            </q-card-section>
            <q-separator class="bg-white" style="width: 90%; margin: 0 auto" />
            <q-form
              @submit.prevent="handleSubmit"
              @reset="handleReset"
              style="height: 80%"
            >
              <q-card-section>
                <q-input
                  v-model="this.loginUser.ユーザid"
                  label="ユーザーID"
                  outlined
                  square
                  class="q-mb-sm"
                />
              
                <q-input
                  v-model="this.loginUser.パスワード"
                  label="パスワード"
                  :type="this.showPassword ? 'text' : 'password'"
                  outlined
                  square
                >
                  <template v-slot:append>
                    <q-icon
                      @click="() => (this.showPassword = !this.showPassword)"
                      :name="
                        this.showPassword ? 'visibility' : 'visibility_off'
                      "
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-actions align="center" style="height: 60%">
                <div>
                  <q-btn
                    label="ログイン"
                    type="submit"
                    color="primary"
                    glossy
                    style="font-size: large"
                  />
                  <q-btn
                    label="レセト"
                    type="reset"
                    color="primary"
                    glossy
                    class="q-ml-sm"
                    style="font-size: large"
                  />
                </div>
              </q-card-actions>
            </q-form>
          </q-card>
        </div>
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from "@/components/Layout/Layout.vue";
import { authApi } from "../../services/apiCreation";

import { ref } from "vue";
export default {
  name: "Login",
  components: {
    Layout,
  },
  setup(){
    const loginUser =  ref({ユーザid:'',パスワード:''})
    const showPassword = ref(false)
    return {
        loginUser,
        showPassword
    }
  },
  methods: {
    async handleSubmit() {
      console.log(this.loginUser)  
      this.loginUser = {...this.loginUser,ログイン:"ログイン"}

      await authApi({...this.loginUser}).then((response)=>{
        if(response.status===200) {
            console.log(JSON.parse(response.data))
        }
      }).catch((error)=>{
        console.log(error)
      })

    },
    handleReset(){
        this.loginUser={}
        this.showPassword=false
    }
  },
  computed:{
    showPasswordIcon(){
        return this.showPassword ? 'visibility' : 'visibility' 
    }
  },
};
</script>
