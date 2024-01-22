<template>
  <footer class="py-lg-5 pt-4 pb-4 bg-dark text-white fs-7">
    <div class="container">
      <div class="row align-items-center border-bottom pb-5">
        <RouterLink :to="{ name: 'index' }" class="col-6 col-lg-3">
          <img src="@/assets/img/logo-white.svg" alt="LOGO" class="px-2 img-fluid"
        /></RouterLink>
        <div class="col-6 col-lg-9">
          <ul class="d-flex mb-0 justify-content-end">
            <li class="pe-2">
              <a href="#" class="social-link" @click.prevent="handleClick">
                <font-awesome-icon :icon="['fab', 'instagram']" class="fs-4" />
              </a>
            </li>
            <li class="px-2">
              <a href="#" class="social-link" @click.prevent="handleClick">
                <font-awesome-icon :icon="['fab', 'facebook-f']" class="fs-5" />
              </a>
            </li>
            <li class="ps-2">
              <a href="#" class="social-link" @click.prevent="handleClick">
                <font-awesome-icon :icon="['fab', 'x-twitter']" class="fs-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col-12 col-lg-6 text-lg-start">
          <ul class="d-flex mb-4 mb-lg-0">
            <li><a href="#" class="pe-3 py-0" @click.prevent="handleClick">常見問題</a></li>
            <li><a href="#" class="px-3 py-0" @click.prevent="handleClick">聯絡我們</a></li>
            <li><a href="#" class="px-3 py-0" @click.prevent="handleClick">隱私權政策</a></li>
          </ul>
        </div>
        <div class="col-12 col-lg-6 text-lg-end text-gray">
          <p>本網站僅供個人作品使用，不提供商業用途</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  handleClick() {
    console.log('已點擊')
  }
}
</script>

<style scoped>
.social-link {
  width: 36px;
  height: 36px;
  background: white;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.social-link:hover {
  color: white;
  background: none;
  outline: solid 2px white;
}
</style>
