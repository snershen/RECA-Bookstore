<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <router-link :to="{ name: 'index' }" class="pe-lg-3">首頁</router-link>
    </li>
    <li class="breadcrumb-item">
      <router-link
        :to="`/${breadConfig.path}`"
        class="px-lg-3"
        :class="{ active: breadConfig.title ? false : true }"
        >{{ breadConfig.subNav }}</router-link
      >
    </li>
    <li class="breadcrumb-item">
      <span class="px-lg-3">
        {{ breadConfig.title }}
      </span>
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    breadConfig: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.breadcrumb-item + .breadcrumb-item::before {
  color: inherit;
}
</style>
