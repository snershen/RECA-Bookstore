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
