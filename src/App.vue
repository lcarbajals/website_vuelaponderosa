<template>
  <div id="app">
   <index></index>
  </div>
</template>
<script>
  import Index from './views/Index';

  export default {
    name:'App',
    components: {
      Index,
    }
  }
</script>