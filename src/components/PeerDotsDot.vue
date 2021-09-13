<template>
  <div :class="className">

  </div>
</template>

<script>
export default {
  name: 'PeerDotsDot',
  
  props: {
    peer: Object,
    index: Number
  },

  computed: {
    className() {
      const c = ['peer-dots-dot']

      return c.join(' ')
    }
  }
}
</script>

<style scoped lang="scss">

.peer-dots-dot {
  border-radius: 2px;
  background-color: white;
  width: 3px;
  height: 3px;
  transition: all 150ms ease;

  & + .peer-dots-dot {
    margin-left: 5px;
  }
}

</style>
