<template>
  <div id="wrapper">
    <tool-bar></tool-bar>
    <main><router-view :key="$route.fullPath"></router-view></main>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
    import ToolBar from '@/components/ToolBar.vue';
    import FootBar from '@/components/FootBar.vue';
    import Vue from 'vue';
    import {mapMutations, mapActions} from 'vuex';

    export default {
        name: 'Index',
        components: {
            ToolBar,
            FootBar,
        },
        data(){
            return{
                loadProperty:false,
                dataProperty:{
                    company:{},
                },
            }
        },
        created(){
            this.getPropiedades();
        },
        mounted(){
            this.loadObjEmpresa();
        },
        methods:{
            ...mapMutations(['setLoading','setGlobales','setEmpresa', 'setRedesSociales']),
            ...mapActions(['loadObjEmpresa']),
            getPropiedades(){
                this.setLoading(true);
                
                this.$http.get('webserviceserver/propiedades_empresa').then((res)=>{
                    Vue.set(this.$data,'dataProperty',res.data);
                    this.loadProperty=true;
                    this.setGlobales({
                        path_web:this.dataProperty.path_web,
                    });
                    this.setEmpresa(this.dataProperty.company);
                    this.setRedesSociales(this.dataProperty.social_network);
                    this.$nextTick(()=>{
						$.SOW.vendor.leaflet.map_openstreet($('.map-leaflet'));
					});
                }).finally(()=>{
                    this.setLoading(false);
                });
                /**/
            },
        },
    }
</script>