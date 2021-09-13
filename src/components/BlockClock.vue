<template>
  <div class="block-clock">
    <div class="dial-shadow" />
    <BlockDialSyncing
      :statusId="statusId"
      :info="info"
    />
    <BlockDialCurrent
      :statusId="statusId"
      :info="info"
    />
    <div class="wrap">
      <BlockClockIcon :info="info" />
      <BlockCount :info="info" />
      <PeerDots :info="info" />
    </div>
  </div>
</template>

<script>
import BlockClockIcon from '@/components/BlockClockIcon.vue'
import BlockCount from '@/components/BlockCount.vue'
import BlockDialSyncing from '@/components/BlockDialSyncing.vue'
import BlockDialCurrent from '@/components/BlockDialCurrent.vue'
import PeerDots from '@/components/PeerDots.vue'

export default {
  name: 'BlockClock',

  components: {
    BlockClockIcon,
    BlockCount,
    BlockDialSyncing,
    BlockDialCurrent,
    PeerDots
  },
  
  props: {
    statusId: String,
    info: Object
  }
}
</script>

<style scoped lang="scss">

.block-clock {
  width: 200px;
  height: 200px;
  position: relative;
  // border: 2px solid rgba(var(--frontRGB), 0.2);
  // border-radius: 10px;
  // padding: 20px;

  .dial-shadow {
    display: block;
    position: absolute;
    left: 2px;
    top: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 200px;
    border: 4px solid white;
    opacity: 0.25;
  }

  .wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

</style>
