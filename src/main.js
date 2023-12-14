import './assets/main.scss'

import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Loading from 'vue3-loading-overlay'
import gsap from 'gsap'

// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faCircleCheck,
  faClipboard
} from '@fortawesome/free-solid-svg-icons'
import { faXmark, faPlus, faMinus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { faInstagram, faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Init plugin
import App from './App.vue'
import router from './router'

library.add(faHeart)
library.add(faXmark)
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

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.use(gsap)
app.component('Loading', Loading)

app.mount('#app')
