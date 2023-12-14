<template>
  <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link border-0"
          href="#"
          aria-label="Previous"
          :class="{ 'd-none': !pagination.has_pre }"
          @click="updatePage(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ active: pagination.current_page === page }"
      >
        <a class="page-link border-0" href="#" @click="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link border-0"
          href="#"
          aria-label="Next"
          :class="{ 'd-none': !pagination.has_next }"
          @click="updatePage(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      pagination: {}
    }
  },
  props: {
    innerPagination: {
      default() {
        return {}
      }
    }
  },
  methods: {
    updatePage(page) {
      this.$emit('emit-page', page)
    }
  },
  watch: {
    innerPagination() {
      this.pagination = this.innerPagination
    }
  }
}
</script>
