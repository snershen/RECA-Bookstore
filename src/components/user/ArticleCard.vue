<template>
  <div class="card-article position-relative">
    <div class="row py-4">
      <div class="col-12 card-img-wrapper">
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
      <div class="col-12 card-content-wrapper">
        <h2 class="fw-bold fs-lg-3 fs-5 mb-2">
          <RouterLink
            :to="`/articles/${article.id}`"
            class="stretched-link text-overflow-2"
            @click.prevent="directArticle(article)"
            >{{ article.title }}</RouterLink
          >
        </h2>
        <p class="fs-6 text-gray text-nowrap mb-2">作者 / {{ article.author }}</p>
        <p class="text-overflow-2 w-100 fs-6 text-gray">{{ article.description }}</p>
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
  },
  beforeCreate() {
    if (this.$route.name === 'articles') {
      document.body.classList.add('articles-card-style')
    } else {
      document.body.classList.remove('articles-card-style')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin';

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

.articles-card-style {
  .card-img-wrapper {
    width: 100%;
    height: 100%;
    @include min-lg {
      width: 40%;
    }
    .card-img {
      max-height: 150px !important;
    }
  }
  .card-content-wrapper {
    width: 100%;
    @include min-lg {
      width: 40%;
    }
  }
}

a:hover {
  color: #000;
}
</style>
