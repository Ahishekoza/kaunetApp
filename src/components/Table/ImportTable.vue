<template>
  <div class="q-ma-md">
    <div class="row q-ma-md">
      <div class="col-md-5 col-sm-5">
        <a class="text-weight-bold q-my-md text-h6">【発注情報】</a>
        <div class="tableWidth">
          <q-table
            :class="['my-sticky-virtscroll-table', 'informationHeader']"
            :rows="rows"
            :columns="columns"
            separator="cell"
            virtual-scroll
            :pagination="pagination"
            hide-pagination
            :rows-per-page-options="[0]"
          />
        </div>
      </div>

      <div class="col-md-5 col-sm-5 offset-sm-2 offset-md-2">
        <div class="q-my-lg">
          <q-card class="borderCard card">
            <q-card-section>
              <div class="row">
                <div style="max-width: 300px" class="col-5">
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
                <div class="col-4">
                  <q-option-group
                    :model-value="modelValue"
                    @update:model-value="$emit('update:model-value', $event)"
                    :options="options"
                    class="text-weight-bold"
                    inline
                    type="radio"
                  />
                </div>
                <div class="col-3">
                  <Button
                    InputClass="bfsize"
                    label="読込"
                    color="cyan"
                    :handleEffect="handleFileImport"
                  ></Button>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { commonApi } from "@/services/apiCreation";
import Button from "../Button.vue";
import * as XLSX from "xlsx";
import { updateApi } from "@/services/apiCreation";
export default {
  name: "ImportTable",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup() {
    const options = ref([
      { label: "追加", value: "追加" },
      { label: "上書き", value: "上書き" },
    ]);
    const columns = ref([
      {
        name: "倉庫",
        align: "left",
        label: "倉庫",
        field: "倉庫",
        field: (row) => row.倉庫,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "発注商品数",
        align: "center",
        label: "発注商品数",
        field: "発注商品数",
        sortable: true,
      },
      {
        name: "発注才数",
        align: "center",
        label: "発注才数",
        field: "発注才数",
        sortable: true,
      },
      {
        name: "発注金額",
        align: "center",
        label: "発注金額",
        field: "発注金額",
        sortable: true,
      },
    ]);
    const rows = ref([]);
    const fileName = ref(null);
    const exportExcelData = ref([]);
    const typeOf発注バラ数 = ref([]);
    const insertedData = ref([]);
    return {
      columns,
      rows,
      fileName,
      exportExcelData,
      options,
      pagination: ref({
        rowsPerPage: 0,
      }),
      typeOf発注バラ数,
      insertedData
    };
  },
  async mounted() {
    await commonApi("v_発注管理_発注情報", "GET", {})
      .then((response) => {
        if (response.status === 200) {
          let parsedData = JSON.parse(response.data.body);
          parsedData.map((item) => {
            this.rows.push(item);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleFileUpload(event) {
      this.xlsxfileread = event.target.files ? event.target.files[0] : null;

      const read = new FileReader();
      read.onload = (e) => {
        const parse_data = e.target.result;
        const workbook = XLSX.read(parse_data, { type: "binary" });
        const worksheet_name = workbook.SheetNames[0];
        const worksheetspresent = workbook.Sheets[worksheet_name];
        const data = XLSX.utils.sheet_to_json(worksheetspresent, { header: 1 });

        // ---ヘッダー バリュー
        const headers = data.shift();

        const tableData = data.map(async (row) => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index];
          });

          // ここに行によって一個一個必要となっている倉庫とSKU_Valueを取って,APIを投げって,もらっているデータはEXCELにある発注バラ数と納品日と一緒に追加する
          // we have to add two parameters in to an object which and then  push it in to exportExcelData array

          if (obj.sku === undefined && obj.倉庫 === undefined) {
          } else {
            await commonApi("v_発注管理_all", "EXCELDATA", {
              倉庫: obj.倉庫,
              sku: obj.sku,
            }).then((response) => {
              if (response.status === 200) {
                let parsedData = JSON.parse(response.data.body)[0];

                if (typeof(obj.発注バラ数)=== "string" ) {
                  this.typeOf発注バラ数.push({ 倉庫: obj.倉庫, sku: obj.sku });
                  console.log(this.typeOf発注バラ数)
                } else {
                  parsedData = {
                    ...parsedData,
                    発注バラ数: obj.発注バラ数,
                    納品日: obj.納品日,
                  };
                  this.exportExcelData.push(parsedData);
                }

                // ---check the type of 発注バラ数 type here and if string  type is present then store the sku of that row in an array
              }
            });
          }
        });
      };
      read.readAsBinaryString(this.xlsxfileread);
    },

    async handleFileImport() {
      if (this.modelValue === "追加") {
        console.log("We can add the file to the parent");

        for (let i = 0; i < this.exportExcelData.length; i++) {
          this.exportExcelData[i] = {
            ...this.exportExcelData[i],
            取込区分: "追加",
          };

          await updateApi({
            登録: "登録",
            倉庫: this.exportExcelData[i].倉庫,
            sku: this.exportExcelData[i].sku,
            仕入先名: this.exportExcelData[i].仕入先名,
            単価: this.exportExcelData[i].単価,
            発注バラ数: this.exportExcelData[i].発注バラ数,
            納品日: this.exportExcelData[i].納品日,
            取込区分: this.exportExcelData[i].取込区分,
            発注区分: this.exportExcelData[i].発注区分,
            更新担当者: this.exportExcelData[i].更新担当者, // created a state for user and then always check with the mounted
            更新日時: this.exportExcelData[i].更新日時,
          }).then((response) => {
              this.insertedData.push(this.exportExcelData[i]);
              // changed rows
          });

          console.log(this.exportExcelData[i]);
        }

        this.$emit("excelData", this.insertedData);
        this.$emit("stringType発注バラ数" , this.typeOf発注バラ数)

        this.insertedData=[];
        this.typeOf発注バラ数=[]

        this.fileName = "";
        this.exportExcelData = [];

        // Use to null the modelValue of file once loaded
        // document.getElementById('emptyFileName').modelValue = ''
      }
      // @TODO : - what to do if person selects　上書き
      if (this.modelValue === "上書き") {
        for (let i = 0; i < this.exportExcelData.length; i++) {
          this.exportExcelData[i] = {
            ...this.exportExcelData[i],
            取込区分: "上書き",
          };
        }
        this.$emit("excelData", this.exportExcelData);
        this.fileName = "";
        this.exportExcelData = [];

        // Use to null the value of file once loaded
        // document.getElementById('emptyFileName').value = ''
      } else {
        console.log("Without selecting an option you can't proceed");
      }
    },
  },
  components: { Button },
};
</script>

<style scoped>
@media (max-width: 820px) {
  .tableWidth {
    width: 400px !important;
  }
}
</style>
