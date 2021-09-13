<template>
  <div class="block-clock-icon">
    <transition name="fade" mode="out-in">
      <div class="wrap" :key="info.statusId">
        <img
          :src="fileName"
          width="30"
          height="30"
        />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BlockClockIcon',

  props: {
    info: Object
  },

  computed: {
    fileName() {
      let result = "bitcoin"

      const icons = {
        pausedManual: 'paused',
        pausedNoWiFi: 'wifi',
        pausedOnBattery: 'unplugged',
        errorSystemClock: 'clock',
        errorGeneric: 'error',
        connecting: 'bitcoin',
        syncing: 'bitcoin',
        current: 'bitcoin'
      }

      if(icons[this.info.statusId]) {
        result = icons[this.info.statusId]
      }

      return "/assets/icons/" + result + ".svg"
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/scss/animations.scss";

.block-clock-icon {
  text-align: center;

  svg {
    color: var(--front);
    width: 30px;
    height: 30px;
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
