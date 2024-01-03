<template>
  <div class="border-bottom position-relative">
    <div class="row py-4">
      <div class="col-12 col-md-4 h-100">
        <div class="overflow-hidden">
          <img
            :src="article.image"
            alt="article.title"
            class="w-100 h-100 object-fit-cover mb-3 mb-lg-0"
          />
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="d-flex align-items-center justify-content-between">
          <span href="#" class="fs-7 text-secondary fw-bold mb-1">#{{ article.tag }}</span>
          <p class="fs-7">{{ article.create_at }}</p>
        </div>
        <h2 class="mb-1 fw-bold text-truncate fs-5">
          <a href="#" class="stretched-link" @click.prevent="directArticle(article)">{{
            article.title
          }}</a>
        </h2>
        <p class="fs-7 mb-3">作者 / {{ article.author }}</p>
        <p class="text-overflow fs-6 text-gray-550">{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    directArticle(article) {
      this.$router.push(`/user/article/${article.id}`)
    }
  }
}
</script>

<style scoped>
li img {
  transition: 0.5s;
  height: 160px !important;
}

li:hover img {
  scale: 1.2;
}
</style>
