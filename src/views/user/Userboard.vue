<template>
  <div>
    <navbar class="mb-5"></navbar>
    <RouterView :key="$route.fullPath" />
    <Footer></Footer>
  </div>
</template>

<script>
import navbar from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
export default {
  components: { navbar, Footer }
}
</script>
