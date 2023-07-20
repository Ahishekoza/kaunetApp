<template>
  <div>
    <div class="row q-my-lg">
      <div class="col-md-5 offset-md-1">
        <q-pagination
          v-model="pagination.page"
          input
          :max="maxPages"
          class="custom-size"
          boundary-numbers="false"
          gutter="lg"
          flat
          size="lg"
          color="grey"
          active-color="red"
        >
        </q-pagination>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-table
          :rows="rows"
          :columns="columns"
          v-model:pagination="pagination"
          row-key="index"
          separator="cell"
          :row-class="(rowData,rowIndex)=> console.log(rowData,rowIndex)"
          v-model:selected="selectedRows"
          hide-bottom
          hide-pagination
          :class="[
            'custom-table',
            'my-sticky-header-column-table',
            'customHeader',
          ]"
          selection="multiple"
        >
            
          

          <template v-slot:body-cell-単位="props">
            <q-td :props="props">
              <p
                class="text-center"
                style="font-size: 1.1rem; margin: 0 0 1px !important"
              >
                個
              </p>
            </q-td>
          </template>

          <template v-slot:body-cell-発注バラ数="props">
            <q-td :props="props" >
              <div>
                <!-- @TODO:- change the value without selecting the checkbox -->
                <q-btn
                  icon="add"
                  class="tableButton"
                  @click="increase_value(props.row.index)"
                ></q-btn>
                <input
                  type="number"
                  style="max-width: 70px"
                  v-model="props.row.発注バラ数"
                  :class="{
                    input_error_発注バラ数: props.row.発注バラ数%props.row.発注ロット !==0,
                  }"
                  
                />
                <q-btn
                  icon="remove"
                  class="tableButton"
                  @click="decrease_value(props.row.index)"
                ></q-btn>
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-納品日="props">
            <q-td>
              <input
                type="text"
                style="max-width: 80px"
                v-model="props.row.納品日"
                :class="{
                    input_error_納品日: ! isDateValid(props.row.納品日) ,
                }"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-まるめ後発注金額="props">
          <q-td :props="props">
            {{ Math.ceil(props.row.発注バラ数*props.row.単価 )}}
          </q-td>
        </template>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { mapState } from "vuex";

export default {
  name: "DisplayTable",
  props: {
    rows: {
      type: Array,
      default: [],
    },
    modelValue:{
      type:String
    },
    
    show:{
      type:Boolean
    }
  },
  setup() {
    const columns = ref([
      {
        name: "index",
        label: "#",
        field: "index",
        field: (row) => row.index,
        format: (val) => `${val}`,
      },
      {
        name: "倉庫",
        required: true,
        label: "倉庫",
        field: "倉庫",
        sortable: true,
      },
      {
        name: "SKU",
        align: "center",
        label: "SKU",
        field: "sku",
        sortable: true,
      },
      {
        name: "サプライヤ品番",
        label: "サプライヤ品番",
        field: "サプライヤ品番",
      },
      {
        name: "品名",
        label: "品名",
        field: "品名",
        align: "center",
      },
      {
        name: "単位",
        label: "単位",
        field: "単位",
      },
      {
        name: "発注ロット",
        label: "発注ロット",
        field: "発注ロット",
      },
      {
        name: "追加ロット",
        label: "追加ロット",
        field: "追加ロット",
      },
      {
        name: "発注ケース数",
        label: "発注ケース数",
        field: "発注ケース数",
      },
      {
        name: "ランク",
        label: "ランク",
        field: "ランク",
      },
      {
        name: "平均日販",
        label: "平均日販",
        field: "平均日販",
      },
      {
        name: "在庫日数",
        label: "在庫日数",
        field: "在庫日数",
      },
      {
        name: "引当可能数",
        label: "引当可能数",
        field: "引当可能数",
      },
      {
        name: "引当保留数",
        label: "引当保留数",
        field: "引当保留数",
      },
      {
        name: "発注バラ数",
        label: "発注バラ数",
        field: "発注バラ数",
      },
      {
        name: "納品日",
        label: "納品日",
        field: "納品日",
        sortable: true,
      },
      {
        name: "Ｐ計画",
        label: "Ｐ/計画",
        field: "発注区分",
      },
      {
        name: "混載グループ",
        label: "混載グループ",
        field: "混載グループ名",
      },
      {
        name: "混載達成状況",
        label: "混載達成状況",
        field: "混載達成状況",
      },
      {
        name: "まるめ後発注才数(容量)",
        label: "まるめ後発注才数(容量)",
        field: "まるめ後発注才数(容量)",
      },
      {
        name: "まるめ後発注金額",
        label: "まるめ後発注金額",
        field: "まるめ後発注金額",
      },
      {
        name: "発注残",
        label: "発注残",
        field: "発注残",
      },
      {
        name: "考慮あり計画発注残",
        label: "考慮あり計画発注残",
        field: "考慮あり計画発注残",
      },
      {
        name: "考慮なし計画発注残",
        label: "考慮なし計画発注残",
        field: "考慮なし計画発注残",
      },
      {
        name: "次回計画納品日",
        label: "次回計画納品日",
        field: "次回計画納品日",
      },
      {
        name: "単価",
        label: "単価",
        field: "単価",
        sortable: true,
      },
      {
        name: "単品才数",
        label: "単品才数",
        field: "単品才数",
      },
      {
        name: "単品重量",
        label: "単品重量",
        field: "単品重量",
      },
      {
        name: "外箱入数",
        label: "外箱入数",
        field: "外箱入数",
      },
      {
        name: "備考",
        label: "備考",
        field: "備考",
      },
      {
        name: "サプライヤコード",
        label: "サプライヤコード",
        field: "サプライヤcd",
      },
      {
        name: "サプライヤ",
        label: "サプライヤ",
        field: "サプライヤ名",
      },
      {
        name: "メーカー名",
        label: "メーカー名",
        field: "メーカー名",
      },
      {
        name: "当初必要数",
        label: "当初必要数",
        field: "当初必要数",
      },
      {
        name: "混載条件",
        label: "混載条件",
        field: "混載条件",
      },
      {
        name: "P 点",
        label: "P 点",
        field: "発注点",
      },
      {
        name: "Q 量",
        label: "Q 量",
        field: "Q量",
      },
    ]);
    const selectedRows = ref([]);
    return {
      selectedRows,
      columns,
      pagination: ref({
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 25,
      }),
    };
  },

  methods: {

    increase_value(id) {
      this.rows.filter((row) => {
        if (row.index == id) {
          if (row.追加ロット == null || row.追加ロット.length == 0) {
            let divided_value =
              (row.発注バラ数 + row.発注ロット) / row.発注ロット;
            row.発注バラ数 = Math.floor(divided_value) * row.発注ロット;
          } else {
            if (row.発注バラ数 < row.発注ロット) {
              row.発注バラ数 = row.発注ロット;
            } else {
              console.log("Error");
              let X = Math.ceil(
                (row.発注バラ数 - row.発注ロット + row.追加ロット) /
                  row.追加ロット
              );
              row.発注バラ数 = row.発注ロット + row.追加ロット * X;
            }
          }
        }
      });
    },
    decrease_value(id) {
      this.rows.filter((row) => {
        if (row.index == id) {
          if (row.追加ロット == null || row.追加ロット.length == 0) {
            let subtract = (row.発注バラ数 - row.発注ロット) / row.発注ロット;

            row.発注バラ数 = Math.ceil(subtract) * row.発注ロット;

            switch (row.発注バラ数 < 0) {
              case true:
                row.発注バラ数 = 0;
                break;
            }
          } else {
            if (row.発注バラ数 < row.発注ロット) {
              row.発注バラ数 = 0;
            } else {
              row.発注バラ数 = row.発注バラ数 - row.追加ロット;

              switch (row.発注バラ数 < row.発注ロット) {
                case true:
                  row.発注バラ数 = 0;
                  break;
              }
            }
          }
        }
      });
    },
    isDateValid(date){
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    if(!regex.test(date)){
      return false
    }
    else{
        return true
    }
  }


  },

  computed: {
    ...mapState(["selectRows"]),
    maxPages() {
      return Math.ceil(this.rows.length / this.pagination.rowsPerPage);
    },
    handleSelection(){
        return this.selectedRows=[]
    }
  },
   

   
  watch:{
    selectedRows(newValue){
      this.$store.dispatch('setSelectedRows',newValue)
    },
    selectRows(newValue){
      if(this.show){
        this.selectedRows = newValue
      }
    },

   
  }
};
</script>
<style scoped>
.q-checkbox__inner {
  height: 0.9em !important;
  font-size: 25px !important;
}
</style>
