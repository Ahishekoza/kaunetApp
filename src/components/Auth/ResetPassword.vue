<template>
    <div>
        <Layout>
            <template v-slot:body>
                <div class="row justify-center items-center">
          <q-card style="height: 350px; width: 500px ;overflow: hidden;" class="q-my-md bg-grey-6">
            <q-card-section>
              <div class="text-h5">新しいパスワードを入力してください。</div>
            </q-card-section>
            <q-separator class="bg-white" style="width: 90%; margin: 0 auto" />
            <!-- <div class="absolute-full flex flex-center" v-if="show" style="z-index: 2">
              <q-circular-progress
                indeterminate
                rounded
                size="50px"
                color="lime"
                class=""
              />
            </div> -->
            <q-form
            
              style="height: 70%"
              
            >
              <q-card-section>
               
                <q-input
                
                  label="前のパスワード"
                  :type="this.showPasswordOriginal ? 'text' : 'password'"
                  outlined
                  square
                  :rules="[ val => val && val.length > 0 || '前のパスワードが必要です']"
                >
                  <template v-slot:append>
                    <q-icon
                      @click="() => (this.showPasswordOriginal = !this.showPasswordOriginal)"
                      :name="
                        this.showPasswordOriginal ? 'visibility' : 'visibility_off'
                      "
                    />
                  </template>
                </q-input>

                <q-input
                  
                  label="新しいパスワード"
                  :type="this.showPasswordNew ? 'text' : 'password'"
                  outlined
                  square
                  :rules="[ val => val && val.length > 0 || 'パスワードが必要です']"
                >
                  <template v-slot:append>
                    <q-icon
                      @click="() => (this.showPasswordNew = !this.showPasswordNew)"
                      :name="
                        this.showPasswordNew ? 'visibility' : 'visibility_off'
                      "
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-card-actions align="center" style="height:38%">
                <div>
                  <q-btn
                    label="リセット"
                    type="submit"
                    color="primary"
                    glossy
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
import Layout from '../Layout/Layout.vue';
import { ref } from 'vue';

export default{
    name:"ResetPassword",
    setup(){
       
        const showPasswordOriginal = ref(false);
        const showPasswordNew = ref(false);

     

        return{
            showPasswordOriginal ,
            showPasswordNew,
            
        }
    },
    mounted(){
        console.log(this.$route.params.ユーザid)
    },
    components:{
        Layout
    }
}
</script>
