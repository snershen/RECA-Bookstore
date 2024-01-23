<template>
  <div class="card-article position-relative">
    <div class="row py-4">
      <div class="col-12">
        <div class="card-img overflow-hidden rounded-3 position-relative mb-3">
          <span
            href="#"
            class="tag fs-7 mb-1 position-absolute text-white top-0 end-0 px-3 py-1 bg-primary"
            >{{ article.tag }}</span
          >
          <img
            :src="article.image"
            :alt="article.title"
            class="w-100 h-100 object-fit-cover mb-2 mb-lg-0"
          />
        </div>
      </div>
      <div class="col-12 w-100">
        <h2 class="fw-bold text-overflow-title fs-3">
          <RouterLink
            to="`articles/${article.id}`"
            class="stretched-link"
            @click.prevent="directArticle(article)"
            >{{ article.title }}</RouterLink
          >
        </h2>
        <p class="fs-7 text-gray text-nowrap mb-2">作者 / {{ article.author }}</p>
        <p class="text-overflow-content w-100 fs-7 text-gray">{{ article.description }}</p>
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
      this.$router.push(`/articles/${article.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-article {
  .card-img {
    height: 200px !important;
  }
  img {
    transition: 0.5s;

    object-fit: cover;
  }
  &:hover img {
    transform: scale(1.2);
  }
}

.tag {
  border-bottom-left-radius: 8px;
  z-index: 1;
}
</style>
