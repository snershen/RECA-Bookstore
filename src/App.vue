<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView
    // HelloWorld
  }
}
</script>

<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <RouterView />
</template>

<style lang="scss">
@import './assets/main.scss';
</style>
