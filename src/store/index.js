import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:true,
    globales:{
      path_web:'',
      name_year:'',
    },
    empresa:{
      razon_social:"",
      telefonos:"",
      email:"",
      direccion:"",
      latitud:"",
      longitud:"",
    },
    redes_sociales:[],
  },
  mutations: {
    setGlobales:(state,obj)=>{
      Vue.set(state,'globales',obj);
    },
    setLoading:(state,value)=>{
      Vue.set(state,'loading',value);
    },
    setEmpresa:(state,obj)=>{
      if(obj){
        Vue.set(state,'empresa',obj);
        localStorage.setItem('empresa', JSON.stringify(obj));
      }
    },
    setRedesSociales:(state,obj)=>{
      Vue.set(state,'redes_sociales',obj);
    },
  },
  actions: {
    loadObjEmpresa({commit, dispatch, getters}){
      let ObjEmpresa= localStorage.getItem('empresa');
      
      if(ObjEmpresa){
        ObjEmpresa = JSON.parse(ObjEmpresa);
        commit('setEmpresa',ObjEmpresa);
      }
    },
  },
  modules: {
  }
})
