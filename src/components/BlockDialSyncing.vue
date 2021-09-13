<template>
  <transition name="fade">
    <div class="block-dial-syncing" v-if="visible">
      <div class="wrap">
        <canvas
          ref="canvas"
          :width="canvasSize"
          :height="canvasSize"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BlockDialSyncing',

  props: {
    statusId: String,
    info: Object
  },

  data() {
    return {
      canvasSize: 400,
      lineWidth: 8,
      updateTimer: null,
      renderedAngle: 0,
      angleTimer: null,
      isClear: true
    }
  },

  watch: {
    info(previous, next) {
      console.log('ww', previous, next)
    },

    statusId(previous, next) {
      console.log('statusId', previous, next)
    }
  },

  mounted() {
    this.updateTimer = setInterval(this.update.bind(this), 50)
  },

  beforeUnmount() {
    clearInterval(this.updateTimer)
  },

  computed: {
    visible() {
      return this.statusId == 'syncing'
    },

    targetAngle() {
      let result = 0

      if(this.visible) {
        result = this.info.syncProgress / 100 * 360
      }

      return result
    }
  },

  methods: {
    clear() {
      this.isClear = true

      const canvas = this.$refs.canvas

      if(!canvas) {
        return
      }

      const context = canvas.getContext('2d')

      context.clearRect(0, 0, this.canvasSize, this.canvasSize)
    },

    draw() {
      this.isClear = false

      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')

      const startAngle = -90
      const endAngle = this.renderedAngle - 90

      const startRadian = startAngle / 180 * Math.PI
      const endRadian = endAngle / 180 * Math.PI

      context.strokeStyle = '#F1D54A'
      context.lineWidth = this.lineWidth
      context.lineCap = 'round'
      context.beginPath()
      context.arc(
        this.canvasSize / 2, 
        this.canvasSize / 2, 
        this.canvasSize / 2 - this.lineWidth, 
        startRadian, 
        endRadian
      )
      context.stroke()
    },

    update() {
      if(!this.isClear) {
        this.clear()
      }

      this.renderedAngle += (this.targetAngle - this.renderedAngle) * 0.15

      if(this.statusId == 'syncing') {
        this.draw()
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/animations.scss";

.block-dial-syncing {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  .wrap {
    position: relative;

    canvas {
      display: block;
      z-index: 1;
      width: 100%;
      height: 100%;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s $ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
