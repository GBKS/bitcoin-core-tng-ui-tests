<template>
  <transition name="fade">
    <div class="block-dial-current" v-if="visible">
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
  name: 'BlockDialCurrent',

  props: {
    statusId: String,
    info: Object
  },

  data() {
    return {
      canvasSize: 400,
      lineWidth: 8,
      updateTimer: null,
      renderedTime: 0,
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
      return this.statusId == 'current'
    },

    targetTime() {
      let result = 0

      if(this.visible) {
        result = this.info.time
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

      if(!canvas) {
        return
      }

      const context = canvas.getContext('2d')

      context.strokeStyle = '#F1D54A'
      context.lineWidth = this.lineWidth
      // context.lineCap = 'round'

      let startTime = 0
      let endTime = 0
      let startAngle = 0
      let endAngle = 0
      let startRadian = 0
      let endRadian = 0
      let block
      let age, agePercentage
      let r, g, b
      for(let i=0; i<this.info.blocks.length; i++) {
        block = this.info.blocks[i]

        endTime = block.minute

        if(endTime >= this.renderedTime) {
          endTime = this.renderedTime
        }

        if(endTime > startTime) {
          startAngle = -90 + startTime / 1440 * 360
          endAngle = -90 + endTime / 1440 * 360

          startRadian = startAngle / 180 * Math.PI
          endRadian = endAngle / 180 * Math.PI

          // Calculate block age to get the color
          age = this.info.time - endTime
          agePercentage = Math.min(100, age) / 100
          agePercentage = 1 - agePercentage
          r = Math.floor(241 - (241 - 236) * agePercentage)
          g = Math.floor(213 - (213 - 84) * agePercentage)
          b = Math.floor(74 - (74 - 69) * agePercentage)

          context.strokeStyle = this.rgbToHex(r, g, b)
          context.beginPath()
          context.arc(
            this.canvasSize / 2, 
            this.canvasSize / 2, 
            this.canvasSize / 2 - this.lineWidth, 
            startRadian, 
            endRadian
          )
          context.stroke()
        }

        if(block.minute >= this.renderedTime) {
          break
        }

        startTime = block.minute + 3
      }
    },

    update() {
      if(!this.isClear) {
        this.clear()
      }

      this.renderedTime += (this.targetTime - this.renderedTime) * 0.15

      if(this.statusId == 'current') {
        this.draw()
      }
    },

    componentToHex(c) {
      const hex = c.toString(16)
      return hex.length == 1 ? "0" + hex : hex
    },

    rgbToHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/animations.scss";

.block-dial-current {
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
