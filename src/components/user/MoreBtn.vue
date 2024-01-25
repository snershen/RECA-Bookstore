<template>
  <RouterLink :to="link" class="btn-more fs-7 fs-lg-6 px-lg-4 px-3 py-2 text-white rounded-pill">
    查看更多
    <font-awesome-icon :icon="['fas', 'chevron-right']" class="btn-more-arrow fa-sm" />
  </RouterLink>
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      default: '/'
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-more {
  background: #000;
  &-arrow {
    margin-left: 3px;
  }
  * {
    transition: 0.2s;
  }
  &:hover {
    background: #c9a65c;
  }
  &:hover &-arrow {
    transform: translateX(3px);
  }
}
</style>
