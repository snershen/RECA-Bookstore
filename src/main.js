import './assets/scss/main.scss'

import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import { createPinia } from 'pinia'
import { Vue3Lottie } from 'vue3-lottie'
import { register } from 'swiper/element/bundle'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCartShopping,
  faHeart as fasHeart,
  faMagnifyingGlass,
  faCircleCheck,
  faChevronLeft,
  faChevronRight,
  faStar as fasStar,
  faXmark,
  faPlus,
  faMinus,
  faPen,
  faTrashCan,
  faBars,
  faArrowLeft,
  faArrowRight,
  faUser,
  faCircleArrowLeft,
  faCheck
} from '@fortawesome/free-solid-svg-icons'

import {
  faClipboard,
  faFileLines,
  faStar,
  faHeart as farHeart,
  faCopy,
} from '@fortawesome/free-regular-svg-icons'

import { faInstagram, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CKEditor from '@ckeditor/ckeditor5-vue'

// Init plugin
import App from './App.vue'
import router from './router'

// import { defineRule } from 'vee-validate'

library.add(fasHeart)
library.add(farHeart)
library.add(faStar)
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faXmark)
library.add(faUser)
library.add(faInstagram)
library.add(faFacebookF)
library.add(faXTwitter)
library.add(faPlus)
library.add(faMinus)
library.add(faCartShopping)
library.add(faMagnifyingGlass)
library.add(faCircleCheck)
library.add(faClipboard)
library.add(faPen)
library.add(faTrashCan)
library.add(faFileLines)
library.add(faBars)
library.add(faArrowLeft)
library.add(faArrowRight)
library.add(faCircleArrowLeft)
library.add(fasStar)
library.add(faCopy)
library.add(faCheck)

// defineRule('required', (value) => {
//   if (!value || !value.length) {
//     return '必填'
//   }
//   return true
// })
// defineRule('email', (value) => {
//   if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
//     return '請填入有效的信箱格式'
//   }
//   return true
// })

// defineRule('phone', (value, args) => {
//   const length = parseInt(args[0], 10)
//   if (isNaN(Number(value))) {
//     return `請輸入數字`
//   } else if (!value || value.length !== length) {
//     return `請輸入正確的手機格式`
//   }
//   return true
// })

const app = createApp(App)
const pinia = createPinia()
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.use(pinia)
app.use(CKEditor)
app.use(Vue3Lottie)

app.component('LoadingComponent', Loading)

register()
app.mount('#app')
