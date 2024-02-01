// import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCoverflow,
  FreeMode,
  Thumbs
} from 'swiper/modules'

export default {
  data() {
    return {
      modules: [
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        Autoplay,
        EffectCoverflow,
        Thumbs,
        FreeMode
      ]
    }
  },
  component: { Swiper, SwiperSlide }
}
