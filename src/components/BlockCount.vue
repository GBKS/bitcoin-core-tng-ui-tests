<template>
  <div class="block-count">
    <div class="wrap">
      <transition name="fade" mode="out-in">
        <h1 :key="'title_' + info.statusId">{{ formattedTitle }}</h1>
      </transition>
      <transition name="fade" mode="out-in">
        <p :key="'description_' + info.statusId">{{ formattedDescription }}</p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockCount',

  props: {
    info: Object
  },

  computed: {
    status() {
      return 'Block height'
    },

    formattedTitle() {
      let result = this.info.status.title

      if(result == 'block-height') {
        result = this.formatNumber(parseInt(this.info.blockHeight), 0)
      } else if(result == 'sync-progress') {
        result = this.info.syncProgress + '%'
      }

      return result
    },

    formattedDescription() {
      let result = this.info.status.description
      
      if(result == 'sync-time-left') {
        let minutesTotal = this.info.syncTimeLeft

        let hours = Math.floor(minutesTotal / 60)
        let minutes = minutesTotal - hours * 60

        if(hours > 0) {
          result = hours + 'h ' + minutes + 'm'
        } else  {
          result = minutes + 'min'
        }
      }

      return result
    }
  },

  methods: {
    formatNumber(amount, fixed) {
      return amount.toFixed(fixed).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c
      })
    }
  }
}
</script>


<style scoped lang="scss">

@import "@/scss/animations.scss";

.block-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 20px;

  h1 {
    margin: 0;
    color: var(--front);
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: rgba(var(--frontRGB), 0.5);
    text-align: center;
    font-size: 18px;
    font-weight: 600;
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
