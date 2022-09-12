<template>
    <div>
        Head
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name:'ToolBar',
        computed:{
            ...mapState(['loading','globales','empresa']),
        },
    }
</script>