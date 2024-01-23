<template>
  <ol class="breadcrumb mb-5">
    <li class="breadcrumb-item text-gray">
      <router-link :to="{ name: 'index' }" class="pe-3">首頁</router-link>
    </li>
    <li class="breadcrumb-item text-gray">
      <router-link
        :to="`/${breadConfig.path}`"
        class="px-3"
        :class="{ active: breadConfig.title ? false : true }"
        >{{ breadConfig.subNav }}</router-link
      >
    </li>
    <li class="breadcrumb-item" :class="{ 'text-dark': breadConfig.title }">
      <span class="px-3">
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
