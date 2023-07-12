import { createStore } from 'vuex'

export default createStore({
  state: {
    showPopup :false,
    name:'',
    selectRows:[]
   
  },
  getters: {
  },
  mutations: {
    setShowUp(state,showPopup){
      state.showPopup=showPopup;
    },
    setName(state,name){
      state.name=name;
    },
    setSelectedRows(state,selectRows){
      state.selectRows=selectRows
    }
    
  },
  actions: {
    setShowUp({commit},showPopup){
      commit('setShowUp',showPopup);
    },
    setName({commit},name){
      commit('setName',name);
    },
    setSelectedRows({commit},selectRows){
      commit('setSelectedRows',selectRows)
    }
    
  },
  modules: {
  }
})
