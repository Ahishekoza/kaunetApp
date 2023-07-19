<template>
  <div>
    <Layout>
      <template v-slot:body>

        <q-dialog v-model="this.showerror"  >
          <q-card>
            <q-card-section class="q-py-sm">
              <span class="text-red">{{ this.error }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                label="はい"
                color="cyan"
                text-color="black"
                glossy
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>


        <div class="row justify-center items-center">
          <q-card style="height: 450px; width: 500px ;overflow: hidden;" class="q-my-md bg-grey-6">
            <q-card-section>
              <div class="text-h5">ログイン</div>
            </q-card-section>
            <q-separator class="bg-white" style="width: 90%; margin: 0 auto" />
            <div class="absolute-full flex flex-center" v-if="show" style="z-index: 2">
              <q-circular-progress
                indeterminate
                rounded
                size="50px"
                color="lime"
                class=""
              />
            </div>
            <q-form
              @submit.prevent="handleSubmit"
              @reset="handleReset"
              style="height: 70%"
              
            >
              <q-card-section>
                <q-input
                  v-model="this.loginUser.ユーザid"
                  label="ユーザーID"
                  outlined
                  square
                  class="q-mb-sm"
                  :rules="[ val => val && val.length > 0 || 'ユーザーIDが必要です']"
                />

                <q-input
                  v-model="this.loginUser.パスワード"
                  label="パスワード"
                  :type="this.showPassword ? 'text' : 'password'"
                  outlined
                  square
                  :rules="[ val => val && val.length > 0 || 'パスワードが必要です']"
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
                  :to="{ name: 'Register' }"
                  style="text-decoration: none"
                  ><span>（開発・検証用）ユーザIDの登録がない場合、事前にこちらをクリック</span>
                </router-link>
              </div>
              <q-card-actions align="center" style="height: 45%">
                <div>
                  <q-btn
                    label="ログイン"
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
import { ref } from "vue";
export default {
  name: "Login",
  components: {
    Layout,
  },
  setup() {
    const loginUser = ref({ ユーザid: "", パスワード: "" });
    const showPassword = ref(false);
    const show = ref(false)
    const showerror = ref(false)
    const error = ref("")

    return {
      loginUser,
      showPassword,
      show,
      error,
      showerror
    };
  },
  mounted(){
   this.reloadWindow
  },
  methods: {
    async handleSubmit() {
      
      this.loginUser = { ...this.loginUser, ログイン: "ログイン" };
      this.show=true
      await authApi({ ...this.loginUser })
        .then((response) => {
          if (response.data.statusCode === 200) {
            const user = JSON.parse(response.data.body);

            

            const parsedUser = { ...user[0], パスワード: "" ,有効期限:"",ユーザid:"",パスワード有効フラグ:"",更新日時:""};
            this.loginUser = { ユーザid: "", パスワード: "" } // empty the values onces logined In
            localStorage.setItem("kaunet_user_token", response.data.token);

            localStorage.setItem(
              "kaunet_user_data",
              JSON.stringify(parsedUser)
            );
            this.show=false

            this.$router.push({ name: "InputTable" });
          }
          else if(response.data.statusCode == 404){  // if password and userId is wrong it will throw an error
            this.showerror=true;
            this.error = response.data.message
            this.show=false
          }
        })
        .catch((error) => {
          this.showerror=true;
          this.error=error.message
          this.show=false
        });
    },
    handleReset() {
      this.loginUser = {};
      this.showPassword = false;
      this.show=false
    },
  },
  computed: {
    showPasswordIcon() {
      return this.showPassword ? "visibility" : "visibility";
    },
    reloadWindow(){
      return window.location.reload()
    }
  },
};
</script>
<style>
.routerlink {
  display: block;
  color: black;
}
</style>
