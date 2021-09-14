<template>
  <div class="transactions-box">
    <ul>
      <li>
        <p>Transactions</p><p>{{ transactionCount }}</p>
      </li>
      <li>
        <p>Block</p><p>{{ blockHeight }}</p>
      </li>
    </ul>
    <div class="copy" v-if="false">
      <p>Transactions</p>
      <p>{{ transactionCount }}</p>
    </div>
    <div class="chart">
      <transition-group name="fade" appear>
        <TransactionsBoxChartItem
          v-for="(item, index) in visibleBlocks"
          :key="index"
          :index="index"
          :info="item"
          :overChartItemId="overChartItemId"
          :transactionCountMax="transactionCountMax"
          :style="{ transitionDelay: (index * 15) + 'ms' }"
          @over="overChartItem"
          @out="outChartItem"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import TransactionsBoxChartItem from '@/components/transactions/TransactionsBoxChartItem.vue'

export default {
  name: 'TransactionsBox',

  components: {
    TransactionsBoxChartItem
  },
  
  props: {
    statusId: String,
    info: Object
  },

  data() {
    return {
      overChartItemId: null
    }
  },

  computed: {
    visibleBlocks() {
      return this.info.blocks.slice(-20)
    },

    blockHeight() {
      let result = this.info.maxBlockHeight

      if(this.activeBlock) {
        result -= this.visibleBlocks.length - this.overChartItemId
      }

      return result
    },

    transactionCount() {
      return this.activeBlock ? this.activeBlock.transactions : '0'
    },

    transactionCountMin() {
      let result
      let block

      for(let i=0; i<this.visibleBlocks.length; i++) {
        block = this.visibleBlocks[i]

        if(i == 0 || block.transactions < result) {
          result = block.transactions
        }
      }

      return result
    },

    transactionCountMax() {
      let result
      let block

      for(let i=0; i<this.visibleBlocks.length; i++) {
        block = this.visibleBlocks[i]

        if(i == 0 || block.transactions > result) {
          result = block.transactions
        }
      }

      console.log('transactionCountMax', result)
      return result
    },

    activeBlock() {
      let index  = this.visibleBlocks.length - 1

      if(this.overChartItemId !== null) {
        index -= this.overChartItemId
      }

      return this.visibleBlocks[index]
    }
  },

  methods: {
    overChartItem(index) {
      this.overChartItemId = index
    },

    outChartItem(index) {
      if(this.overChartItemId == index) {
        this.overChartItemId = null
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/animations.scss";

.transactions-box {
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .copy {
    flex-grow: 1;
    width: 50%;
    display: flex;
    flex-direction: column;

    p {
      margin: 0;
      font-size: 12px;
      font-weight: 600;
      color: rgba(var(--frontRGB), 0.5);
      white-space: normal;
    }

    h2 {
      margin: 0;
      font-size: 27px;
      color: var(--front);
    }
  }

  ul {
    margin: 0 0 0 0;
    padding: 0;
    display: flex;

    li {
      margin: 0;
      padding: 0;
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      p {
        margin: 0;
        flex-grow: 1;
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

  .chart {
    flex-grow: 1;
    min-height: 60px;
    display: flex;
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
