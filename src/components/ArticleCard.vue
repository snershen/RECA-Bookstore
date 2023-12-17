<template>
  <ul class="row">
    <li
      v-for="article in colConfig.article"
      class="row border-bottom py-4 position-relative"
      :class="colConfig.liCol"
    >
      <div class="col-5">
        <img
          :src="article.image"
          alt=""
          class="w-100 h-100 object-fit-cover"
          style="max-height: 140px"
        />
      </div>
      <div class="col-7">
        <div class="d-flex align-items-center justify-content-between mb-2">
          <div class="d-flex align-items-center">
            <a href="#" class="btn btn-dark rounded-0 me-3 px-2 py-1 fs-7">{{ article.tag }}</a>
          </div>
          <p class="fs-7">{{ article.create_at }}</p>
        </div>
        <h2 class="mb-1 fw-bold text-truncate" :class="colConfig.titleFont">{{ article.title }}</h2>
        <!-- <p class="fs-6">作者 / {{ article.author }}</p> -->
        <!-- <p class="text-truncate">{{ article.description }}</p> -->
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
