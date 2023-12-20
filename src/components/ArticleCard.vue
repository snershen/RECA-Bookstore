<template>
  <ul class="row">
    <li
      v-for="article in colConfig.article"
      class="row border-bottom py-4 position-relative"
      :class="colConfig.liCol"
    >
      <div class="col-4 h-100">
        <div class="overflow-hidden">
          <img :src="article.image" alt="" class="w-100 h-100 object-fit-cover" />
        </div>
      </div>
      <div class="col-8 h-100">
        <div class="d-flex align-items-center justify-content-between">
          <a href="#" class="rounded-0 fs-7 text-secondary mb-1">#{{ article.tag }}</a>
          <p class="fs-7">{{ article.create_at }}</p>
        </div>
        <h2 class="mb-1 fw-bold text-truncate" :class="colConfig.titleFont">{{ article.title }}</h2>
        <p class="fs-6 mb-3">作者 / {{ article.author }}</p>
        <p class="text-truncate">{{ article.description }}</p>
      </div>
      <a href="#" class="stretched-link" @click.prevent="goArticle(article)"></a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    colConfig: {
      type: Object,
      required: true
    }
  },
  methods: {
    goArticle(article) {
      this.$router.push(`/user/article/${article.id}`)
    }
  }
}
</script>

<style scoped>
li img {
  transition: 0.5s;
  height: 150px !important;
}
li:hover img {
  scale: 1.2;
}
</style>
