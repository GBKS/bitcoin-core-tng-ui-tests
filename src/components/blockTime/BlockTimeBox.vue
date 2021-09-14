<template>
  <div class="block-time-box">
    <p>Average block time</p>
    <h2>{{ averageBlockTime }}</h2>
    <div class="chart">
      <canvas
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'BlockTimeBox',

  components: {

  },
  
  props: {
    statusId: String,
    info: Object
  },

  data() {
    const times = []
    while(times.length < 20) {
      times.push({
        value: Math.random()
      })
    }

    return {
      canvasWidth: 400,
      canvasHeight: 120,
      times: times
    }
  },

  mounted() {
    this.draw()
  },

  computed: {
    averageBlockTime() {
      return '7:39'
    }
  },

  methods: {
    draw() {
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')

      context.strokeStyle = 'white'
      context.setLineDash([2, 2])
      context.beginPath()
      context.moveTo(0, this.canvasHeight / 2)
      context.lineTo(this.canvasWidth, this.canvasHeight / 2)
      context.stroke()

      context.strokeStyle = '#EC5445'
      context.setLineDash([])

      for(var i=0; i<this.times.length; i++) {
        context.beginPath()
        context.moveTo(
          i * this.canvasWidth / this.times.length,
          this.times[i].value * this.canvasHeight
        )
        context.lineTo(
          (i + 1) * this.canvasWidth / this.times.length,
          this.times[i].value * this.canvasHeight
        )
        context.stroke()
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/variables.scss";

.block-time-box {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  
  p {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: rgba(var(--frontRGB), 0.5);
  }

  h2 {
    margin: 3px 0 0 0;
    font-size: 16px;
    color: var(--front);
  }

  .chart {
    margin-top: 10px;
    background-color: rgba($red, 0.1);

    canvas {
      width: 200px;
      height: 60px;
    }
  }
}

</style>
