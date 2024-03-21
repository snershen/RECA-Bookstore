<template>
  <header>
    <div class="wrapper"></div>
  </header>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  components: {
    RouterView
  },
  created() {
    AOS.init({})
  }
}
</script>




