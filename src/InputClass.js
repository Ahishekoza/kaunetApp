export const Management={
    担当者:'',
    商品区分:[],
    倉庫:'',
    発注計画有無:1,
    発注区分:[], 
    サプライヤ:'', 
    メーカー:'',
    品番Sku:[],
    サプライヤ品番:[],
    商品名:[],
    混載グループ名称:[],
    未達混載グループ名称:[],
    輸出データ:"追加"
}


export const isDateValid = (date) =>{
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    if(!regex.test(date)){
      return false
    }
    else{
        return true
    }
  }

