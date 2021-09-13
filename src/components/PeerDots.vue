<template>
  <div :class="className">
    <PeerDotsDot
      v-for="(item, index) in info.peers"
      :key="index"
      :index="index"
      :peer="peer"
    />
  </div>
</template>

<script>
import PeerDotsDot from '@/components/PeerDotsDot.vue'

export default {
  name: 'PeerDots',

  components: {
    PeerDotsDot
  },

  props: {
    info: Object
  },

  computed: {
    className() {
      const c = ['peer-dots']

      c.push('-' + this.info.statusId)
      c.push(this.info.peerStatusId)

      return c.join(' ')
    }
  }
}
</script>


<style lang="scss">

@import "@/scss/variables.scss";

.peer-dots {
  display: flex;

  &.-connecting,
  &.connecting {
    .peer-dots-dot {
      animation: loadingDots 1500ms linear infinite;

      &:nth-child(1) { animation-delay: 50ms; }
      &:nth-child(2) { animation-delay: 125ms; }
      &:nth-child(3) { animation-delay: 200ms; }
      &:nth-child(4) { animation-delay: 275ms; }
      &:nth-child(5) { animation-delay: 350ms; }
    }
  }

  &.p_00 {
    .peer-dots-dot {
      opacity: 25%
    }
  }

  &.p_20 {
    .peer-dots-dot {
      &:nth-child(2) { opacity: 25% }
      &:nth-child(3) { opacity: 25% }
      &:nth-child(4) { opacity: 25% }
      &:nth-child(5) { opacity: 25% }
    }
  }

  &.p_40 {
    .peer-dots-dot {
      &:nth-child(3) { opacity: 25% }
      &:nth-child(4) { opacity: 25% }
      &:nth-child(5) { opacity: 25% }
    }
  }

  &.p_60 {
    .peer-dots-dot {
      &:nth-child(4) { opacity: 25% }
      &:nth-child(5) { opacity: 25% }
    }
  }

  &.p_80 {
    .peer-dots-dot {
      &:nth-child(5) { opacity: 25% }
    }
  }

  &.p_100 {
    .peer-dots-dot {
      
    }
  }

  &.error {
    .peer-dots-dot {
      background-color: $red;
    }
  }
}

@keyframes loadingDots {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

</style>
