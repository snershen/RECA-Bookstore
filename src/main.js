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
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons'
import { faXmark, faPlus, faMinus, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import { faClipboard } from '@fortawesome/free-regular-svg-icons'

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

import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return '必填'
  }
  return true
})
defineRule('email', (value) => {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
    return '請填入有效的信箱格式'
  }
  return true
})

defineRule('phone', (value, args) => {
  const length = parseInt(args[0], 10)
  if (isNaN(Number(value))) {
    return `請輸入數字`
  } else if (!value || value.length !== length) {
    return `請輸入正確的手機格式`
  }
  return true
})

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.use(gsap)

app.component('Loading', Loading)

app.mount('#app')
