<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Scroll from './components/scroll.vue'
export default {
  name: 'app',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Scroll
  }
}
</script>
<style>
#app {
}
</style>
