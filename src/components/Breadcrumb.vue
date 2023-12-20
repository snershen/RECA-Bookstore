<template>
  <ol class="breadcrumb mb-5">
    <li class="breadcrumb-item">
      <router-link to="/user/home">首頁</router-link>
    </li>
    <li class="breadcrumb-item">
      <router-link
        :to="`/user/${breadConfig.path}`"
        :class="{ active: breadConfig.title ? false : true }"
        >{{ breadConfig.subNav }}</router-link
      >
    </li>
    <li class="breadcrumb-item" :class="{ 'fw-bold': breadConfig.title }">
      {{ breadConfig.title }}
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
