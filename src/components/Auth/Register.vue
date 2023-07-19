<template>
  <div >
    <Layout >
      <template v-slot:body>
        <div class="column  items-center" >
       
            <q-card style="height: 500px; width: 500px" class="q-my-md bg-grey-6">
            <q-card-section>
              <div class="text-h5">登録</div>
            </q-card-section>
            <q-separator class="bg-white" style="width: 90%; margin: 0 auto" />
            <q-form
              @submit.prevent="handleSubmit"
              @reset="handleReset"
              style="height: 80%"
            >
              <q-card-section>
                <q-input
                  v-model="this.user.ユーザid"
                  label="ユーザーID"
                  outlined
                  square
                  class="q-mb-sm"
                  :rules="[ val => val && val.length > 0 || 'ユーザーIDが必要です']"
                />
                <q-input
                  v-model="this.user.担当者"
                  label="担当者"
                  outlined
                  square
                  class="q-mb-sm"
                  :rules="[ val => val && val.length > 0 || '担当者が必要です']"
                />
                <q-input
                  v-model="this.user.パスワード"
                  label="パスワード"
                  :type="this.showPassword ? 'text' : 'password'"
                  outlined
                  square
                  :rules="[validatePassword]"
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
              <div class="text-center q-mt-lg">
                <router-link
                  class="routerlink"
                  :to="{ name: 'home' }"
                  style="text-decoration: none"
                  ><span>ログイン画面に戻る</span></router-link
                >
              </div>
              <q-card-actions align="center" style="height: 25%">
                <div>
                  <q-btn
                    label="登録"
                    type="submit"
                    color="primary"
                    glossy
                    style="font-size: large"
                  />
                  <q-btn
                    label="リセット"
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
import { User } from "../../InputClass";
import { ref } from "vue";
export default {
  name: "Register",
  setup() {
    const user = ref(User);
    const showPassword = ref(false);
    const show = ref(false);
    return {
      user,
      showPassword,
      show
    };
  },
  methods: {


    validatePassword(){
      const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

      if(!regex.test(this.user.パスワード)){
        return "パスワードは文字と数字の両方を含み、8文字以下でなければならない。"
      }
      else{
        return true
      }

    },

    async handleSubmit() {
      this.user = { ...this.user, 登録: "登録" };
      await authApi({ ...this.user })
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({name:'home'})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleReset() {
      this.user = [];
      this.showPassword = false;
    }
    
  },



  computed: {
    // showPasswordIcon() {
    //   return this.showPassword ? "visibility" : "visibility";
    // },
  },
  components: {
    Layout,
  },
};
</script>

