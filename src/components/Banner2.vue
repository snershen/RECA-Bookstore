<template>
  <div class="stage">
    <div class="container">
      <div class="ring">
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  mounted() {
    let xPos = 0

    gsap
      .timeline()
      .set('.ring', { rotationY: 180, cursor: 'grab' })
      .set('.img', {
        rotateY: (i) => i * -36,
        transformOrigin: '50% 50% 500px',
        z: -500,
        backgroundImage: (i) => 'url(https://picsum.photos/id/' + (i + 32) + '/600/400/)',
        // backgroundPosition: (i) => this.getBgPos(i),
        backfaceVisibility: 'hidden'
      })
      .from('.img', {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: 'expo'
      })
      .add(() => {
        document.querySelectorAll('.img').forEach((img) => {
          img.addEventListener('mouseenter', this.handleMouseEnter)
          img.addEventListener('mouseleave', this.handleMouseLeave)
        })
      }, '-=0.5')

    window.addEventListener('mousedown', this.dragStart)
    window.addEventListener('touchstart', this.dragStart)

    window.addEventListener('mouseup', this.dragEnd)
    window.addEventListener('touchend', this.dragEnd)
  },
  methods: {
    handleMouseEnter: (e) => {
      let current = e.currentTarget
      gsap.to('.img', {
        opacity: (i, t) => (t == current ? 1 : 0.5),
        ease: 'power3'
      })
    },
    handleMouseLeave: () => {
      gsap.to('.img', { opacity: 1, ease: 'power2.inOut' })
    },
    dragStart: function (e) {
      if (e.touches) e.clientX = e.touches[0].clientX
      this.xPos = Math.round(e.clientX)
      gsap.set('.ring', { cursor: 'grabbing' })
      window.addEventListener('mousemove', this.drag)
      window.addEventListener('touchmove', this.drag)
    },
    drag: function (e) {
      if (e.touches) e.clientX = e.touches[0].clientX

      gsap.to('.ring', {
        rotationY: '-=' + ((Math.round(e.clientX) - this.xPos) % 360),
        onUpdate: () => {
          document.querySelectorAll('.img').forEach((img) => {
            gsap.set(img, { backgroundPosition: (i) => this.getBgPos(i) })
          })
        }
      })

      this.xPos = Math.round(e.clientX)
    },
    dragEnd: function () {
      window.removeEventListener('mousemove', this.drag)
      window.removeEventListener('touchmove', this.drag)
      gsap.set('.ring', { cursor: 'grab' })
    },
    getBgPos: function (i) {
      return (
        100 -
        (gsap.utils.wrap(0, 360, gsap.getProperty('.ring', 'rotationY') - 180 - i * 36) / 360) *
          500 +
        'px 0px'
      )
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousedown', this.dragStart)
    window.removeEventListener('touchstart', this.dragStart)
    window.removeEventListener('mouseup', this.dragEnd)
    window.removeEventListener('touchend', this.dragEnd)
  }
}
</script>

<style scoped>
html,
body,
.stage,
.ring,
.img {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  user-select: none;
}

html,
body,
.stage {
  overflow: hidden;
  /* background: #000; */
}

div,
svg {
  position: absolute;
}

.container {
  perspective: 1000px;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
