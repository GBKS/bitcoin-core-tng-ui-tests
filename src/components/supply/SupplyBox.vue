<template>
  <div class="supply-box">
    <div class="copy">
      <h2><img
            src="/assets/icons/bitcoin.svg"
            width="16"
            height="16"
          />Supply</h2>
      <ul>
        <li>
          <p>Bitcoin</p><p>{{ supply }}</p>
        </li>
        <li>
          <p>Inflation</p><p>{{ inflation }}</p>
        </li>
      </ul>
    </div>
    <div class="chart">
      <canvas
        ref="canvas"
        :width="canvasSize"
        :height="canvasSize"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupplyBox',
  
  props: {
    statusId: String,
    info: Object
  },

  data() {
    return {
      canvasSize: 200,
      lineWidth: 4,
      percentage: 0.75
    }
  },

  mounted() {
    this.draw()
  },

  computed: {
    supply() {
      return '18,797,660'
    },

    inflation() {
      return '1.5%'
    }
  },

  methods: {
    draw() {
      const canvas = this.$refs.canvas

      if(!canvas) {
        return
      }

      const context = canvas.getContext('2d')

      const radius = this.canvasSize - this.lineWidth / 2

      context.strokeStyle = 'white'
      context.lineWidth = 4
      context.globalAlpha = 1
      context.beginPath()
      context.arc(
        this.canvasSize, 
        this.canvasSize, 
        radius, 
        0, 
        Math.PI * 2
      )
      context.stroke()

      context.globalAlpha = 0.2
      context.beginPath()
      context.moveTo(0, this.canvasSize - this.lineWidth / 2)
      context.lineTo(this.canvasSize, this.canvasSize - this.lineWidth / 2)
      context.stroke()

      context.strokeStyle = '#F7931A'
      context.lineWidth = 4
      context.globalAlpha = 1
      context.beginPath()
      context.arc(
        this.canvasSize, 
        this.canvasSize, 
        radius, 
        0, 
        Math.PI * 2 * (0.5 + 0.25 * this.percentage)
      )
      context.stroke()

      const angle = 180 + 90 * this.percentage
      const angleRadian = angle / 180 * Math.PI
      const x = this.canvasSize + Math.cos(angleRadian) * radius
      const y = this.canvasSize + Math.sin(angleRadian) * radius

      context.fillStyle = 'black'
      context.beginPath()
      context.arc(
        x, 
        y, 
        8, 
        0, 
        Math.PI * 2
      )
      context.fill();
      context.stroke()
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/animations.scss";

.supply-box {
  width: 200px;
  height: 100px;
  display: flex;
  gap: 10px;
  // background-color: rgba(blue, 0.5);
  align-items: stretch;

  .copy {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;

    h2 {
      margin: 0;
      font-size: 12px;
      color: var(--front);
      display: flex;
      align-items: center;

      img {
        margin-right: 5px;
      }
    }

    ul {
      margin: 0 0 0 0;
      padding: 0;
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: space-between;

      li {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;

        p {
          margin: 0;
          color: rgba(var(--frontRGB), 0.5);
          font-size: 12px;
          font-weight: 600;

          &:last-child {
            margin: 3px 0 0 0;
            color: var(--front);
            font-weight: 600;
            font-size: 16px;
            // text-align: right;
          }
        }
      }
    }
  }

  .chart {
    canvas {
      width: 100px;
      height: 100px;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s $easeOutQuart;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
