<template>
  <div>
    <!-- -----Remaining CheckBox Integration with v-model -->

    <!-- @TODO:- Create Computed property for Login Logout  -->
    <!-- ---title depends on Login and Logout -->

    <div
      :class="[layoutSpinner ? 'spinnerCenter' : 'q-my-md']"
      v-if="layoutSpinner"
    >
      <q-spinner-oval color="primary" size="10em" />
    </div>

    <!-- Creating A dialog box which will appear after updation -->

    <Layout title="発注画面" v-if="!layoutSpinner">
      <template v-slot:headerButton>
        <q-dialog v-model="this.error">
          <q-card>
            <q-card-section class="q-py-sm">
              {{ this.errorMessage }}
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

        <div :class="customClass">
          <q-card style="height: 500px; width: 100%; overflow-y: scroll;" >
            <q-card-section
              style="
                height: 90%;
                width: 700px;
                box-sizing: border-box;
                overflow-wrap: break-word;
              "
            >
              <div
                class="q-mb-md"
                v-if="this.showChangedRowData.length"
                style="overflow-y: scroll; height: 160px"
              >
                <p class="text-h7">更新したデータ</p>
                <q-separator />
                <ul>
                  <li v-for="row in this.showChangedRowData">
                    <span>{{ row.index }}</span
                    >行目 倉庫:<span>{{ row.倉庫 }}</span> SKU:<span>{{
                      row.sku
                    }}</span>
                    品名:<span>"{{ row.品名 }}"</span>
                  </li>
                </ul>
              </div>
              <q-separator />
              <div
                class="q-mb-md"
                v-if="this.insertedData.length"
                style="overflow-y: scroll; height: 160px"
              >
                <p class="text-h7">登録したデータ</p>
                <q-separator />
                <ul>
                  <li v-for="row in this.insertedData">
                    <span>{{ row.index }}</span
                    >行目 倉庫:<span>{{ row.倉庫 }}</span> SKU:<span>{{
                      row.sku
                    }}</span>
                    品名:<span>"{{ row.品名 }}"</span>
                  </li>
                </ul>
              </div>
              <q-separator />
              <div
                class="q-mb-md"
                v-if="this.typeOf発注バラ数.length"
                style="overflow-y: scroll; height: 160px"
              >
                <p class="text-h7">発注バラ数は文字になっているんです</p>
                <q-separator />
                <ul>
                  <li v-for="row in this.typeOf発注バラ数">
                    倉庫:<span>{{ row.倉庫 }}</span> SKU:<span>{{
                      row.sku
                    }}</span>
                  </li>
                </ul>
              </div>
              <q-separator />
              <div
                v-if="this.deletedRows.length"
                style="overflow-y: scroll; height: 160px"
              >
                <p class="text-h7">削除したデータ</p>
                <q-separator />
                <ul>
                  <li v-for="row in this.deletedRows">
                    <span>{{ row.index }}</span
                    >行目 倉庫:<span>{{ row.倉庫 }}</span> SKU:<span>{{
                      row.sku
                    }}</span>
                    品名:<span>"{{ row.品名 }}"</span>
                  </li>
                </ul>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <Button
                label="はい"
                color="cyan"
                textColor="black"
                InputClass="bfsize"
                class="q-mx-sm"
                :handleEffect="handleToast"
              />
            </q-card-actions>
          </q-card>
        </div>
        
        <Toast
          label="入力に誤りがあります。"
          show="true"
          :itemsArray="this.MatchDate"
        >
          <template v-slot:default>
            <p v-for="row in this.MatchDate">
              <span>{{ row.index }}</span
              >行目 倉庫:<span>{{ row.倉庫 }}</span> SKU:<span>{{
                row.sku
              }}</span>
              品名:<span>"{{ row.品名 }}"</span> の:<span>{{ row.error }}</span>
            </p>
          </template>
          <template v-slot:button>
            <Button
              label="はい"
              color="cyan"
              textColor="black"
              InputClass="bfsize"
              :handleEffect="handleToast"
            />
          </template>
        </Toast>

        <div :class="[this.noChange ? 'displayToast' : 'displayNAN']">
          <q-card style="height: 120px; width: 500px">
            <q-card-section style="margin: 0 auto">
              <div class="text-h6 text-center">
                変更されたデータがありません。
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <Button
                label="はい"
                color="cyan"
                textColor="black"
                InputClass="bfsize"
                :handleEffect="handleToast"
              />
            </q-card-actions>
          </q-card>
        </div>

        <div class="q-my-md">
          <div class="container">
            <div class="row">
              <div class="col-md-2 offset-md-9">
                <Button
                  :label="handleChange"
                  :color="handleColorChange"
                  textColor="black"
                  InputClass="bfsize"
                  :handleEffect="handleEffect"
                />
              </div>

              <div class="col-md-1">
                <q-btn :icon="icon" @click="handleDropdown"></q-btn>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <div class="container borderCard" id="inputTable">
          <div :class="[showPopup ? 'visible , PopContainer' : 'hidden']">
            <PopUp
              :model-value="popInput"
              @update:model-value="popInput = $event"
              :handlePopUp="handlePopUp"
              :handleClose="handleClose"
            ></PopUp>
          </div>

          <div class="row">
            <q-card class="card">
              <div class="col-md-12 flex-row q-pa-sm">
                <div>
                  <p class="bfsize">検索条件</p>
                </div>
                <div>
                  <Button
                    label="検索条件クリア"
                    color="cyan"
                    textColor="black"
                    InputClass="bfsize"
                    :handleEffect="handleClear"
                  />
                </div>
              </div>
              <div class="q-mt-sm">
                <q-separator style="height: 1px; background-color: black" />
              </div>
              <q-card-section>
                <!-- Row #1 -->
                <!-- @TODO : -- width of 2nd and 4th should be same  -->
                <div class="row q-mb-xs">
                  <div class="col-md-3 col-sm-2">
                    <Input
                      :model-value="this.InputClass.担当者"
                      @update:model-value="this.InputClass.担当者 = $event"
                      customWidth="450px"
                      name="担当者"
                      :options="contactPerson"
                      label="value"
                    />
                  </div>
                  <div class="col-md-3 col-sm-5">
                    <Checkbox
                      :options="options"
                      :model-value="this.InputClass.商品区分"
                      @update:model-value="this.InputClass.商品区分 = $event"
                    />
                  </div>
                  <div class="col-md-3 col-sm-2">
                    <Input
                      :model-value="this.InputClass.倉庫"
                      @update:model-value="this.InputClass.倉庫 = $event"
                      customWidth="450px !important"
                      name="倉庫"
                      cfname="col-md-2 col-sm-4"
                      cfselect="col-md-10  col-sm-8"
                      :options="storageOptions"
                    />
                  </div>
                  <!-- one row splitted in to two rows -->
                  <div class="col-md-3 col-sm-3">
                    <div
                      class="row bbO"
                      style="
                        max-width: 480px;
                        height: 67px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <div class="row">
                        <div class="col-md-12 col-sm-6">
                          <q-option-group
                            size="xs"
                            :options="optionsThree"
                            v-model="this.InputClass.発注計画有無"
                            type="radio"
                            inline
                          />
                        </div>
                      </div>
                      <div style="border: 1px solid black; width: 100%"></div>
                      <div class="row">
                        <div class="col-md-12 col-sm-6">
                          <q-option-group
                            size="xs"
                            :options="optionsTwo"
                            v-model="this.InputClass.発注区分"
                            type="checkbox"
                            inline
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Row #2 -->
                <div class="row q-mb-xs">
                  <div class="col-md-6 col-6 col-5">
                    <Input
                      :model-value="this.InputClass.サプライヤ"
                      @update:model-value="this.InputClass.サプライヤ = $event"
                      customWidth="556px"
                      name="サプライヤ"
                      cfname="col-md-2 col-sm-4"
                      cfselect="col-md-10  col-sm-8"
                      :options="supplierOptions"
                    />
                  </div>

                  <div class="col-md-6 col-6 col-6">
                    <Input
                      :model-value="this.InputClass.メーカー"
                      @update:model-value="this.InputClass.メーカー = $event"
                      customWidth="556px"
                      name="メーカー"
                      cfname="col-md-2 col-sm-4"
                      cfselect="col-md-10  col-sm-8"
                      :options="makerOptions"
                    />
                  </div>
                </div>
                <!-- Row #3 -->

                <div class="row q-mb-xs">
                  <div class="col-md-3 col-4 col-sm-4">
                    <Textarea
                      customWidth="500px !important"
                      name="品番(SKU)"
                      v-model="this.InputClass.品番Sku"
                    ></Textarea>
                  </div>
                  <div class="col-md-4 col-4 col-sm-4">
                    <Textarea
                      showButton="true"
                      :model-value="this.InputClass.サプライヤ品番"
                      @update:model-value="
                        this.InputClass.サプライヤ品番 = $event
                      "
                      name="サプライヤ品番"
                    >
                    </Textarea>
                  </div>
                  <div class="col-md-5 col-4 col-sm-4">
                    <Textarea
                      showButton="true"
                      customWidth="600px !important"
                      :model-value="this.InputClass.商品名"
                      @update:model-value="this.InputClass.商品名 = $event"
                      name="商品名"
                    >
                    </Textarea>
                  </div>
                </div>

                <!-- Row #4 -->
                <div class="row q-mb-xs">
                  <div class="col-md-4 col-sm-5">
                    <Textarea
                      showButton="true"
                      name="混載グループ名称"
                      :model-value="this.InputClass.混載グループ名称"
                      @update:model-value="
                        this.InputClass.混載グループ名称 = $event
                      "
                    >
                    </Textarea>
                  </div>
                  <div class="col-md-4 col-sm-3">
                    <Textarea
                      name="未達混載グループ名称"
                      v-model="this.InputClass.未達混載グループ名称"
                    ></Textarea>
                  </div>
                  <div class="col-md-4 col-sm-4">
                    <div class="row">
                      <div class="col-md-7 col-sm-7">
                        <div style="max-width: 300px">
                          <q-file
                            @input="handleFileUpload"
                            square
                            clearable
                            outlined
                            v-model="fileName"
                            color="black"
                            label="Files"
                          >
                            <template v-slot:prepend>
                              <q-icon name="folder_open" color="cyan" />
                            </template>
                          </q-file>
                        </div>
                      </div>
                      <div
                        class="col-md-4 col-sm-4 offset-md-1 q-mt-md q-ml-md"
                      >
                        <Button
                          label="検索"
                          class="customWidth"
                          color="cyan"
                          style="
                            font-size: 1.1rem !important;
                            font-weight: bold;
                          "
                          :handleEffect="handleFileData"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </template>
      <template v-slot:middleBody>
        <ImportTable
          v-if="showMiddleBody"
          :model-value="this.InputClass.輸出データ"
          @update:model-value="this.InputClass.輸出データ = $event"
          @excelData="this.insertedData=$event"
          @stringType発注バラ数="this.typeOf発注バラ数=$event"

        />
      </template>
      <template v-slot:displayBody>
        <div class="text-center q-my-lg">
          <q-spinner v-if="spinner" color="primary" size="7em" />
        </div>

        <!-- :show="this.show"  v-if= this.rows.length -->
        <DisplayTable
          :model-value="this.seachSku"
          @update:model-value="this.seachSku = $event"
          v-if="this.rows.length"
          :rows="this.rows"
          :show="this.deleteRows"
        />
      </template>
    </Layout>
  </div>
</template>
<script>
import Layout from "@/components/Layout/Layout.vue";
import Button from "../Button.vue";
import Input from "../Input.vue";
import Textarea from "../Textarea.vue";
import Checkbox from "../Checkbox.vue";
import ImportTable from "./ImportTable.vue";
import PopUp from "../PopUp.vue";
import DisplayTable from "./DisplayTable.vue";
import Toast from "../Toast.vue";
import { Management } from "../../InputClass";
import { isDateValid } from "../../InputClass";
import { commonApi } from "../../services/apiCreation";
import { checkApi } from "../../services/apiCreation";
import { deleteApi } from "../../services/apiCreation";
import { ref } from "vue";
import { mapState } from "vuex";
import * as XLSX from "xlsx";

export default {
  name: "InputTable",
  components: {
    Layout,
    Button,
    Input,
    Textarea,
    PopUp,
    Checkbox,
    ImportTable,
    DisplayTable,
    Toast,
  },
  setup() {
    // show middleBody
    const showMiddleBody = ref(true);
    // show spinners
    const spinner = ref(false);

    const layoutSpinner = ref(false);

    // Variables for all model values
    const popInput = ref("");
    const fileName = ref(null);

    // collecting the excel data and then passing it to the 品番(SKU) model on 検索 click

    const xlsxReadFile = ref([]); // Temporary variable

    const show = ref(false);
    const showPopUp = ref(false);
    const showDialog = ref(false);

    const contactPerson = ref([]);
    const storageOptions = ref([]);
    const supplierOptions = ref([]);
    const makerOptions = ref([]);

    const icon = ref("arrow_drop_up");

    // Creating 2 copies of the class Management as we need one to display data according to our needs and
    // second to check the data as it is in the database
    const InputClass = ref(Management); // Display Data

    // --Rows
    const rows = ref([]);
    const proxyRows = ref([]);

    const checkDate = ref([]); //---For checking the date format and the 発注バラ数 number present in the table as we need only
    // one aaray for both the date and the number we will go with already configured checkDate

    const seachSku = ref("");

    const changedRowData = ref([]); // 更新した行を出せるようにします
    const showChangedRowData = ref([]);

    const insertedData = ref([]); //  登録に関する配列

    const noChange = ref(false);

    const body = ref({}); // passing the data by creating a object of required variables
    // --- if this value is true then add the excel rows in the table and if this value is false then null the rows in the table
    const checkExcelData = ref(false);

    // error
    const error = ref(false);
    const errorMessage = ref("");

    // delete
    const deleteRows = ref(false);

    // select
    const selectedRows = ref([]);
    const deletedRows = ref([]);

    // ---updated data
    const data = ref([]);

    const dataExcel = ref([]);
    const typeOf発注バラ数  = ref([]);

    const baseCheck = ref([]); // base check will check whether the person doing the editing, deleting and updating is same as in the database

    return {
      // showMiddleBody
      showMiddleBody,

      // --spinner
      spinner,
      layoutSpinner,
      // ---display rows
      rows,
      proxyRows,
      changedRowData,
      showChangedRowData,

      insertedData,

      noChange,
      body,

      selectedRows, // for deletion
      checkDate,

      checkExcelData, //check before making rows null

      //
      popInput,
      //

      xlsxReadFile,
      fileName,
      InputClass,

      // -- options for select Button
      contactPerson,
      storageOptions,
      supplierOptions,
      makerOptions,
      //-----
      seachSku,
      // ---Toggle Dropdown Button
      icon,

      // error
      error,
      errorMessage,

      // delete
      deleteRows,

      selectedRows, // for delection
      deletedRows, //for display

      dataExcel,
      typeOf発注バラ数,

      baseCheck,

      options: [
        { label: "一般品", value: "01" },
        { label: "大ロット", value: "02" },
        { label: "組立家具", value: "03" },
      ],
      optionsTwo: [
        { label: "P点発注", value: "P" },
        { label: "計画発注", value: "計画" },
      ],
      // Radio Button Options
      optionsThree: [
        { label: "発注計画ありのみ", value: 1 },
        { label: "対象品番全て", value: 0 },
      ],
      show,
      showPopUp,
      showDialog,

      data,
    };
  },
  async mounted() {
    // if(localStorage.getItem("kaunet_user_data") && localStorage.getItem("kaunet_user_token")){
      this.layoutSpinner = true;
    // ---担当者
    await commonApi("v_発注管理_担当者", "GET", {})
      .then((response) => {
        if (response.status === 200) {
          let parsedData = JSON.parse(response.data.body);
          parsedData.map((person) => {
            this.contactPerson.push(person);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // ---ｻﾌﾟﾗｲﾔ
    await commonApi("v_発注管理_ｻﾌﾟﾗｲﾔ", "GET", {})
      .then((response) => {
        if (response.status === 200) {
          let parsedData = JSON.parse(response.data.body);
          parsedData.map((supplier) => {
            this.supplierOptions.push(supplier);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // 倉庫
    await commonApi("v_発注管理_倉庫", "GET", {})
      .then((response) => {
        if (response.status === 200) {
          let parsedData = JSON.parse(response.data.body);
          parsedData.map((storage) => {
            this.storageOptions.push(storage);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // ﾒｰｶｰ
    await commonApi("v_発注管理_ﾒｰｶｰ", "GET", {})
      .then((response) => {
        if (response.status === 200) {
          let parsedData = JSON.parse(response.data.body);
          parsedData.map((maker) => {
            this.makerOptions.push(maker);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await commonApi("v_発注管理_混載未達", "GET", {})
      .then((response) => {
        if (response.status === 200) {
          let parsedData = JSON.parse(response.data.body);

          const joinAndPush = parsedData.map((item) => item.value).join("\n");
          this.InputClass.未達混載グループ名称.push(joinAndPush);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    this.layoutSpinner = false;
    // }
    // else{
    //   this.$router.push({name:'home'})
    // }
  },
  methods: {
    handleDropdown() {
      this.icon = "arrow_drop_down";
      let tableId = document.getElementById("inputTable");
      if (tableId.style.display != "none") {
        tableId.style.display = "none";
        this.showMiddleBody = false;
      } else {
        this.icon = "arrow_drop_up";
        tableId.style.display = "block";
        this.showMiddleBody = true;
      }
    },

    // -- この関数は発注バラ数と納品日はsku(品番)と倉庫によって更新するために作られています
    async handleEffect() {
      //Writing Delete Functionality
      // If we have selected rows then it will get deleted or else it will get updatwe

      // collect all the rows and throws at onces
      // 更新 // showChangedRows
      // 登録 // insertedData
      // 削除 // selectedRows
      // すでに更新 // baseCheck

      this.show = !this.show;

      //need to check whether we require this or not

      this.rows.filter((row) => {
        const validate = isDateValid(row.納品日);
        // const reminder = row.発注バラ数 % row.発注ロット !== 0;
        // if (!validate && reminder) {
        //   this.checkDate.push({ ...row, error: "納品日,発注バラ数" });
        // } else {
        if (!validate) {
          this.checkDate.push({ ...row, error: "納品日" });
        }
        // if (reminder) {
        //   this.checkDate.push({ ...row, error: "発注バラ数" });
        // }
        // }
      });

      if (this.checkDate.length === 0) {
        await this.handleDelete();
        await this.handleUpdate();
        await this.handleInsert();
        await this.handleFileData();
      } else {
        this.noChange = false;
      }

      // if (this.checkDate.length) {
      //   this.noChange = false;
      // }
      // // ----add the values or overwrite the values
      // if (this.dataExcel.length) {
      //   this.dataExcel.map(async (row) => {
      //     await updateApi({
      //       登録: "登録",
      //       倉庫: row.倉庫,
      //       sku: row.sku,
      //       仕入先名: row.仕入先名,
      //       単価: row.単価,
      //       発注バラ数: row.発注バラ数,
      //       納品日: row.納品日,
      //       取込区分:row.取込区分,
      //       発注区分: row.発注区分,
      //       更新担当者: row.更新担当者,
      //       更新日時: row.更新日時,
      //     }).then((response) => {
      //       if (response.data.message) {
      //         this.baseCheck.push(response.data.message);
      //       } else {
      //         this.insertedData.push(row)
      //       }
      //     });
      //   });
      //   this.checkExcelData = false;
      //   this.show = false;
      //   this.handleUpdate()
      // }

      // // check for deletion if any row is selected or not
      // else if (this.selectRows.length > 0 && this.checkDate.length === 0) {
      //   this.selectedRows = this.selectRows;
      //   this.handleDelete()
      // }

      // //  also && validation for 発注バラ数
      // else if (this.checkDate.length === 0 && this.selectRows.length === 0) {
      //   this.handleUpdate();
      // }
    },

    async handleDelete() {
      this.selectedRows = this.selectRows;
      if (this.selectedRows.length) {
        this.selectedRows.map(async (row) => {
          await deleteApi({
            削除: "削除",
            倉庫: row.倉庫,
            sku: row.sku,
            発注区分: row.発注区分,
            更新担当者: "abhishek",
            更新日時: row.更新日時,
          })
            .then((response) => {
              if (response.data.message) {
                this.baseCheck.push(response.data.message);
              } else {
                this.deletedRows.push(row);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });
        this.deleteRows = true;
        this.selectedRows = [];
        this.$store.state.selectRows = [];
      } else {
        this.deleteRows = false;
      }
    },

    async handleUpdate() {
      for (let i = 0; i < this.rows.length; i++) {
        if (
          this.rows[i].発注バラ数 !== this.proxyRows[i].発注バラ数 ||
          this.proxyRows[i].納品日 !== this.rows[i].納品日
        ) {
          this.data.push(this.rows[i]);
        }
      }
      if (this.data.length) {
        this.data.filter(async (row) => {
          await updateApi({
            更新: "更新",
            発注バラ数: row.発注バラ数,
            納品日: row.納品日,
            倉庫: row.倉庫,
            sku: row.sku,
            発注区分: row.発注区分,
            更新担当者: "abhishek",
            更新日時: row.更新日時,
          }).then((response) => {
            if (response.data.message) {
              this.baseCheck.push(response.data.message);
            } else {
              const updatedRow = JSON.parse(response.data.body)[0];
              console.log("更新した行", updatedRow);
              this.changedRowData.push(row);
            }
          });
        });
        console.log(this.changedRowData);
        this.showChangedRowData = this.changedRowData;
        // this.changedRowData=[]
        this.show = false;
        this.data = [];
      } else {
        // ---if deleteRows is true then dont show the small display
        if (this.deleteRows) {
        }
        // --- if deleteRows is false then show the small display
        else {
          this.noChange = true;
        }
      }

      // if (this.deleteRows) {
      //   for(let i = 0; i < this.rows.length ; i++) {
      //       if(this.rows[i].発注バラ数 !== this.proxyRows[i].発注バラ数 || this.proxyRows[i].納品日 !== this.rows[i].納品日){
      //         this.data.push(this.rows[i])
      //       }
      //   }
      //   if (this.data.length) {
      //       this.data.filter(async (row) => {
      //         await updateApi({
      //           更新: "更新",
      //           発注バラ数: row.発注バラ数,
      //           納品日: row.納品日,
      //           倉庫: row.倉庫,
      //           sku: row.sku,
      //           発注区分: row.発注区分,
      //           更新担当者: "abhishek",
      //           更新日時: row.更新日時,
      //         }).then((response) => {

      //           if(response.data.message){
      //             this.baseCheck.push(response.data.message)
      //           }
      //           else{
      //             const updatedRow = JSON.parse(response.data.body)[0];
      //             console.log("更新した行", updatedRow);
      //             this.changedRowData.push(row);
      //           }
      //         });
      //       });
      //       this.showChangedRowData =  this.changedRowData
      //       this.changedRowData=[]
      //       this.show = false;
      //       this.data=[]
      //     if(this.dataExcel.length){
      //       await this.handleInsert()
      //     }
      //   } else {
      //     if(this.dataExcel.length){
      //       await this.handleInsert()
      //     }
      //     else{
      //       this.show = false;
      //     }
      //   }
      // } else {
      //   for(let i = 0; i < this.rows.length ; i++) {
      //       if(this.rows[i].発注バラ数 !== this.proxyRows[i].発注バラ数 || this.proxyRows[i].納品日 !== this.rows[i].納品日){
      //         this.data.push(this.rows[i])
      //       }
      //   }
      //   if (this.data.length) {
      //       this.data.filter(async (row) => {
      //         await updateApi({
      //           更新: "更新",
      //           発注バラ数: row.発注バラ数,
      //           納品日: row.納品日,
      //           倉庫: row.倉庫,
      //           sku: row.sku,
      //           発注区分: row.発注区分,
      //           更新担当者: "abhishek",
      //           更新日時: row.更新日時,
      //         }).then((response) => {
      //           if(response.data.message){
      //             this.baseCheck.push(response.data.message)
      //           }
      //           else{
      //             const updatedRow = JSON.parse(response.data.body)[0];
      //             console.log("更新した行", updatedRow);
      //             this.changedRowData.push(row);
      //           }
      //         });
      //       });
      //       this.showChangedRowData =  this.changedRowData
      //       this.changedRowData=[]
      //       this.show = false;
      //       this.data=[]
      //       if(this.dataExcel.length){
      //       await this.handleInsert()
      //     }

      //   } else {
      //     if(this.dataExcel.length){
      //       await this.handleInsert()
      //     }
      //     else{
      //       this.show = false;
      //       this.noChange = true;
      //     }
      //   }
      // }
    },

    async handleInsert() {
      this.dataExcel.map(async (row) => {
        // ---check if the data in the row of 発注バラ数 is number or word
        if (typeof(row.発注バラ数) === String) {
          // collect the rows and then display it with the common msg
          // ----create a new array to display not update rows number

          this.typeOf発注バラ数.push(row)

        } else {
          await updateApi({
            登録: "登録",
            倉庫: row.倉庫,
            sku: row.sku,
            仕入先名: row.仕入先名,
            単価: row.単価,
            発注バラ数: row.発注バラ数,
            納品日: row.納品日,
            取込区分: row.取込区分,
            発注区分: row.発注区分,
            更新担当者: row.更新担当者,
            更新日時: row.更新日時,
          }).then((response) => {
            if (response.data.message) {
              this.baseCheck.push(response.data.message);
            } else {
              this.insertedData.push(row)
            }
          });
        }
      });
      // this.checkExcelData = false;
      this.show = false;
    },

    // ------ Calling Api on the bases of Name (POPUP handleClose and handlePopUp)
    async handlePopUp() {
      if (this.name == "サプライヤ品番") {
        this.InputClass.サプライヤ品番 = [];
        await commonApi("v_発注管理_ｻﾌﾟﾗｲﾔsku", "GETBYSUPPLIERNUMBER", {
          value: this.popInput,
        })
          .then((response) => {
            if (response.status == 200) {
              let parseData = JSON.parse(response.data.body);

              const joinAndPush = parseData
                .map((item) => item.value)
                .join("\n");
              this.InputClass.サプライヤ品番.push(joinAndPush);

              this.$store.dispatch("setShowUp", false);
              this.$store.dispatch("setName", "");
              this.popInput = "";

              console.log(this.InputClass.サプライヤ品番);
            }
            //@TODO:- insert this into class array
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (this.name == "商品名") {
        this.InputClass.商品名 = [];
        await commonApi("v_発注管理_品名", "GETBYPRODUCTNAME", {
          value: this.popInput,
        })
          .then((response) => {
            if (response.status == 200) {
              let parseData = JSON.parse(response.data.body);

              const joinAndPush = parseData
                .map((item) => item.value)
                .join("\n");
              this.InputClass.商品名.push(joinAndPush);

              this.$store.dispatch("setShowUp", false);
              this.$store.dispatch("setName", "");
              this.popInput = "";
              console.log(this.InputClass.商品名);
            }
          })
          .console.log((error) => {
            console.log(error);
          });
      }

      if (this.name == "混載グループ名称") {
        this.InputClass.混載グループ名称 = [];
        await commonApi("v_発注管理_混載グループ", "GETBYMIXEDLOADING", {
          value: this.popInput,
        })
          .then((response) => {
            console.log(response);
            if (response.status == 200) {
              let parseData = JSON.parse(response.data.body);
              console.log(parseData);
              const joinAndPush = parseData
                .map((item) => item.value)
                .join("\n");
              this.InputClass.混載グループ名称.push(joinAndPush);
              this.$store.dispatch("setShowUp", false);
              this.$store.dispatch("setName", "");
              this.popInput = "";

              console.log(this.InputClass.混載グループ名称);
            }
            //@TODO:- insert this into class array
          })
          .console.log((error) => {
            console.log(error);
          });
      }

      // @TODO Call API and Pass it to the appropriate variable present in the class
    },

    handleClose() {
      this.$store.dispatch("setShowUp", false);
      this.$store.dispatch("setName", "");
      this.popInput = "";
    },

    // This function was made on change which will collect the values but we need to pass the values on the click of 検索 button so
    // we need to create a new function  in this case we have created handleFileData()
    handleFileUpload(event) {
      this.xlsxfileread = event.target.files ? event.target.files[0] : null;

      const read = new FileReader();
      read.onload = (e) => {
        const parse_data = e.target.result;
        const workbook = XLSX.read(parse_data, { type: "binary" });
        const worksheet_name = workbook.SheetNames[0];
        const worksheetspresent = workbook.Sheets[worksheet_name];
        const data = XLSX.utils.sheet_to_json(worksheetspresent, { header: 1 });

        //  we need to slice first row because we don't want headers name
        const slicedData = data.slice(1);

        this.InputClass.品番Sku = slicedData.join("\n");
      };
      read.readAsBinaryString(this.xlsxfileread);
    },

    // handleExcelData(event) {
    //   if (event.length > 0) {
    //     this.dataExcel = [...this.dataExcel, ...event];
    //     console.log(this.dataExcel);
    //     // this.rows = [...this.rows, ...event];
    //     // this.rowIndex;
    //     // this.checkExcelData = true;
    //   }
    // },

    // 検索ボタンを押した後でこのfunctionが動けます
    async handleFileData() {
      // --- if checkExcelData is true then rows coming from database will be added directly and if its false means user is changing the values
      // --- so rows present before will get null

      this.rows = [];
      this.dataExcel = [];

      let tableId = document.getElementById("inputTable");

      if (this.InputClass.担当者 !== "") {
        this.body = { ...this.body, 担当者: this.InputClass.担当者 };
      }
      if (this.InputClass.担当者 === null) {
        delete this.body.担当者;
      }
      if (this.InputClass.商品区分.length) {
        this.body = { ...this.body, 商品区分: this.InputClass.商品区分 };
      }

      if (this.InputClass.倉庫 !== "") {
        this.body = { ...this.body, 倉庫: this.InputClass.倉庫 };
      }
      if (this.InputClass.倉庫 === null) {
        delete this.body.倉庫;
      }

      if (this.InputClass.発注区分.length) {
        this.body = { ...this.body, 発注区分: this.InputClass.発注区分 };
      }

      if (this.InputClass.サプライヤ !== "") {
        this.body = { ...this.body, サプライヤcd: this.InputClass.サプライヤ };
      }
      if (this.InputClass.サプライヤ === null) {
        delete this.body.サプライヤcd;
      }

      if (this.InputClass.メーカー !== "") {
        this.body = { ...this.body, メーカcd: this.InputClass.メーカー };
      }
      if (this.InputClass.メーカー === null) {
        delete this.body.メーカcd;
      }

      if (this.InputClass.品番Sku.length) {
        this.body = { ...this.body, 品番: this.InputClass.品番Sku.split("\n") };
      }
      if (this.InputClass.サプライヤ品番.length) {
        this.body = {
          ...this.body,
          サプライヤ品番: this.InputClass.サプライヤ品番[0].split("\n"),
        };
      }
      if (this.InputClass.商品名.length.length) {
        this.body = {
          ...this.body,
          商品名: this.InputClass.商品名[0].split("\n"),
        };
      }
      if (
        this.InputClass.混載グループ名称.length &&
        this.InputClass.未達混載グループ名称.length
      ) {
        this.body = {
          ...this.body,
          混載グループ名: [
            ...this.InputClass.混載グループ名称[0].split("\n"),
            ...this.InputClass.未達混載グループ名称[0].split("\n"),
          ],
        };
      }
      if (
        this.InputClass.混載グループ名称.length === 0 &&
        this.InputClass.未達混載グループ名称.length
      ) {
        this.body = {
          ...this.body,
          混載グループ名: [
            ...this.InputClass.未達混載グループ名称[0].split("\n"),
          ],
        };
      }
      if (
        this.InputClass.混載グループ名称.length &&
        this.InputClass.未達混載グループ名称.length === 0
      ) {
        this.body = {
          ...this.body,
          混載グループ名: [...this.InputClass.混載グループ名称[0].split("\n")],
        };
      }

      this.spinner = true;
      // ---Input Table Hide
      this.icon = "arrow_drop_down";
      tableId.style.display = "none";
      this.showMiddleBody = false;

      if (this.InputClass.発注計画有無 > 0) {
        this.body = { ...this.body, 発注計画有無: "発注計画有無" };

        await checkApi({ ...this.body })
          .then((response) => {
            if (response.status === 200) {
              let parsedData = JSON.parse(response.data.body);
              console.log(JSON.parse(response.data.body));
              this.proxyRows = JSON.parse(response.data.body); // proxyRowsは発注バラ数と納品日に受けた変更を計るために作った変数

              if (parsedData.length === 0) {
                (this.error = true),
                  (this.errorMessage = "対象データがありませんでした");
                this.spinner = false;
              }

              this.rows = [...this.rows, ...parsedData];
            }

            this.rowIndex;

            this.spinner = false;
            // this.checkExcelData = false;
            // this.deleteRows = false;
            this.body = {};
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        delete this.body.発注計画有無;
        await checkApi({ ...this.body })
          .then((response) => {
            if (response.status === 200) {
              let parsedData = JSON.parse(response.data.body);
              console.log(JSON.parse(response.data.body));
              this.proxyRows = JSON.parse(response.data.body); // proxyRowsは発注バラ数と納品日に受けた変更を計るために作った変数

              if (parsedData.length === 0) {
                (this.error = true),
                  (this.errorMessage = "対象データがありませんでした");
                this.spinner = false;
              }

              this.rows = parsedData;
            }

            this.rowIndex;
            this.spinner = false;
            // this.checkExcelData = false;
            // this.deleteRows = false;
            this.body = {};
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    handleToast() {
      this.checkDate = [];
      this.noChange = false;
      this.show = false;
      this.deletedRows = [];
      this.showChangedRowData = [];
      this.changedRowData = [];
      this.baseCheck = [];
      this.insertedData = [];
      this.MatchDate;
    },

    handleClear() {
      (this.InputClass.担当者 = ""),
        (this.InputClass.商品区分 = []),
        (this.InputClass.倉庫 = ""),
        (this.InputClass.発注区分 = []),
        (this.InputClass.サプライヤ = ""),
        (this.InputClass.メーカー = ""),
        (this.InputClass.品番Sku = []),
        (this.InputClass.サプライヤ品番 = []),
        (this.InputClass.商品名 = []),
        (this.InputClass.混載グループ名称 = []);
      // this.InputClass.未達混載グループ名称 = [];
    },

    handleselectedDelete() {
      this.deleteRows = true;
      this.$store.state.selectRows = [];
      this.selectedRows = [];
    },
  },
  computed: {
    ...mapState(["showPopup", "name", "selectRows"]),
    handleChange() {
      return this.show ? "発注データ確定" : "発注データ更新";
    },
    handleColorChange() {
      return this.show ? "red" : "cyan";
    },
    rowIndex() {
      this.rows.map((row, index) => {
        return (row.index = index + 1);
      });
    },
    MatchDate() {
      return this.checkDate;
    },

    errorShow() {
      return this.error;
    },
    // --- computed class for msgs displaying ---
    customClass() {
      if (
        this.showChangedRowData.length > 0 ||
        this.insertedData.length > 0 ||
        this.deletedRows.length > 0||
        this.typeOf発注バラ数.length>0
      ) {
        return "displayToast";
      } else {
        return "displayNAN";
      }
    },
  },
  watch: {
    error(newValue) {
      this.error = newValue;
    },
    selectedRows(newValue) {
      this.selectedRows = newValue;
    },
    rows(newValue) {
      if (newValue) {
        this.rows = newValue;
      }
    },
    noChange(newValue) {
      if (newValue) {
        this.noChange = newValue;
      }
    },
    insertedData(newValue){
      if(newValue.length > 0){
        this.handleFileData()
      }
    }
  },
};
</script>
<style scoped>
.row > .offset-sm-6 {
  margin-left: 90%;
}
.customWidth {
  width: 200px !important;
}
@media (max-width: 820px) {
  .row > .offset-sm-6 {
    margin-left: 60%;
  }
  .customWidth {
    width: 200px !important;
  }
}
</style>
