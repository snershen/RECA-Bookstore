<template>
  <nav aria-label="Page navigation example" class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          :class="{ 'd-none': !pagination.has_pre }"
          @click.prevent="updatePage(pagination.current_page - 1)"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="fa-sm" />
        </a>
      </li>
      <li
        class="page-item mx-1"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ active: pagination.current_page === page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          :class="{ 'd-none': !pagination.has_next }"
          @click.prevent="updatePage(pagination.current_page + 1)"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="fa-sm" />
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
.page-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  margin-left: 4px;
  width: 32px;
  height: 32px;
  font-weight: bold;
  font-size: 0.875rem;
  border: 1px solid #dfe3e8;
  background: none;
  color: #d3d3d3;
  border-radius: 4px;
}

.page-item:first-child .page-link,
.page-item:last-child .page-link {
  border-radius: 4px;
}

.page-item:not(:first-child, :last-child) .page-link {
  color: #868686;
}

.page-link:focus {
  box-shadow: none;
}

.page-item.active .page-link {
  color: #000;
  border: 2px solid #000;
}
</style>
