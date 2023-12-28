<template>
  <div>
    <ul id="container" ref="container">
      <li v-for="(book, index) in bookList" :key="index" class="box" ref="box">
        <router-link to="">
          <img :src="book.imgUrl" alt="" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  data() {
    return {
      bookList: [
        { imgUrl: 'https://cdn.readmoo.com/cover/a4/735ci97_460x580.jpg?v=1700185429' },
        { imgUrl: 'https://cdn.readmoo.com/cover/mp/kgzotfd_460x580.jpg?v=1699011524' },
        { imgUrl: 'https://cdn.readmoo.com/cover/d5/7chejkh_460x580.jpg?v=1675064291' },
        { imgUrl: 'https://cdn.readmoo.com/cover/a7/g786ibb_460x580.jpg?v=1500883422' },
        { imgUrl: 'https://cdn.readmoo.com/cover/nm/nndczje_460x580.jpg?v=1699341496' },
        { imgUrl: 'https://cdn.readmoo.com/cover/lg/fenjqea_460x580.jpg?v=1599816606' },
        { imgUrl: 'https://cdn.readmoo.com/cover/lg/fenjqea_460x580.jpg?v=1599816606' }
      ],
      categoryList: [],
      products: []
    }
  },
  methods: {
    applyGSAPAnimations() {
      gsap.timeline().set(this.$refs.container, { perspective: 1200 })

      this.$refs.box.forEach((box, index) => {
        gsap.set(box, {
          left: '50%',
          top: '50%',
          x: '-50%',
          y: '-50%',
          z: 400,
          width: '25%',
          borderRadius: 8
        })

        gsap.fromTo(
          box,
          {
            scaleY: 0,
            scaleX: -1,
            zIndex: () => (index < this.bookList.length / 2 ? -index : index),
            rotationY: 50 + (index / this.bookList.length) * 140,
            transformOrigin: String('50% 50% -1200%')
          },
          {
            scaleY: 1,
            duration: 1,
            delay: 1 - 0.5 * (index / this.bookList.length),
            ease: 'elastic'
          }
        )

        box.onmouseenter = () => {
          gsap.to(box, {
            duration: 0.3,
            rotationX: 0,
            y: '-70%',
            ease: 'back.out(6)'
          })
        }

        box.onmouseleave = () => {
          gsap.to(box, { duration: 0.4, rotationX: 0, y: '-50%' })
        }
      })

      this.$refs.container.onmousemove = (e) => {
        gsap.to(this.$refs.box, {
          duration: 0.6,
          rotationY: (index) =>
            90 + (index / this.bookList.length) * 140 + 90 * (e.clientX / window.innerWidth)
        })
      }
    }
  },
  mounted() {
    this.applyGSAPAnimations()

    window.addEventListener('resize', () => {
      // 在視窗大小改變時重新應用 GSAP 動畫
      this.applyGSAPAnimations()
    })
  }
}
</script>

<style scoped>
#container {
  top: 0;
  width: 100%;
  height: 50vh;
  perspective: 1000px;
  overflow: hidden;
}

.box {
  position: absolute;
  user-select: none;
  overflow: hidden;
}

.box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media screen and (max-width: 576px) {
  .box {
    width: 100% !important;
  }
}

@media screen and (max-width: 992px) {
  .box {
    width: 50% !important;
  }
}

@media screen and (min-width: 993px) {
  .box {
    width: 25% !important;
  }
}
</style>
