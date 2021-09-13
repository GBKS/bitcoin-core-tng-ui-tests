<template>
  <div
    :class="className"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
  >
    <div :style="barStyle" />
  </div>
</template>

<script>

export default {
  name: 'TransactionsBoxChartItem',

  components: {

  },
  
  props: {
    overChartItemId: Number,
    index: Number,   
    transactionCountMax: Number,   
    info: Object
  },

  computed: {
    className() {
      const c = ['transactions-box-chart-item']

      if(this.overChartItemId == this.index) {
        c.push('-active')
      }

      return c.join(' ')
    },

    barStyle() {
      let height = this.info.transactions / this.transactionCountMax

      return {
        height: height * 100 + '%'
      }
    }
  },

  methods: {
    mouseEnter() {
      this.$emit('over', this.index)
    },

    mouseLeave() {
      this.$emit('out', this.index)
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/variables.scss";
@import "@/scss/animations.scss";

.transactions-box-chart-item {
  flex-grow: 1;
  position: relative;

  div {
    position: absolute;
    left: 2px;
    right: 2px;
    bottom: 0;
    background-color: $blue;
    border-radius: 1px;
    // transition: all 50ms $ease;
  }

  &.-active {
    div {
      background-color: white;
    }
  }

  & + .transactions-box-chart-item {
    // margin-left: 2px;
  }
}

</style>
