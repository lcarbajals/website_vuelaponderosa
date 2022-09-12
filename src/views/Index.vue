<template>
  <div>
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
    }
</script>