<template>
  <div class="bg-primary vh-100">
    <div
      class="container text-white fw-bold d-flex flex-column justify-content-center align-items-center h-100 text-center"
    >
      <h1 class="title">404</h1>
      <h2 class="subtitle">not found</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 10em;
  font-weight: bold;
  letter-spacing: 12px;
  line-height: 1.2;
  @media (min-width: 992px) {
    font-size: 12em;
  }
}

.subtitle {
  font-size: 4em;
  font-weight: bold;
  line-height: 1.2;
   @media (min-width: 992px) {
    font-size: 8em;
  }
}
</style>