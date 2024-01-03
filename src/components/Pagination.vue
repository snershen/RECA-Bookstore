<template>
  <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link border-0"
          href="#"
          aria-label="Previous"
          :class="{ 'd-none': !pagination.has_pre }"
          @click.prevent="updatePage(pagination.current_page - 1)"
        >
          <!-- <span aria-hidden="true">&laquo;</span> -->
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </a>
      </li>
      <li
        class="page-item mx-1"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ active: pagination.current_page === page }"
      >
        <a class="page-link border-0" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link border-0"
          href="#"
          aria-label="Next"
          :class="{ 'd-none': !pagination.has_next }"
          @click.prevent="updatePage(pagination.current_page + 1)"
        >
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
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

<style scoped>
.active .page-link {
  background: #000;
  color: white;
}

.page-link {
  color: #000;
}
</style>
