<template>
    <div>
        Foot
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    
    export default {
        name:'FootBar',
        data(){
           return{
               notificacionNoticia:0,
               notificacionConvocatoria:0,
           }
        },
        components: {
			
		},
        props:{
        },
        created(){
            
        },
        methods:{
        },
        computed:{
            ...mapState(['empresa', 'redes_sociales']),
        },
        mounted(){
           
        }
    }
</script>
