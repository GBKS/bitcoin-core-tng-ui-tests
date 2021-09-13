<template>
  <li :class="className">
    <button type="button" @click="select">{{ statusId }}</button>
  </li>
</template>

<script>
export default {
  name: 'DataManipulatorItem',

  props: {
    activeStatusId: String,
    statusId: String,
    status: Object,
  },

  computed: {
    className() {
      const c = ['data-manipulator-item']

      if(this.activeStatusId == this.statusId) {
        c.push('-active')
      }

      return c.join(' ')
    }
  },

  methods: {
    select() {
      this.$emit('select', this.statusId)
    }
  }
}
</script>


<style scoped lang="scss">

.data-manipulator-item {
  border-top: 1px solid rgba(var(--frontRGB), 0.2);

  button {
    display: block;
    margin: 0;
    padding: 10px 0;
    appearance: none;
    background-color: transparent;
    border-width: 0;
    color: var(--front);
    opacity: 0.75;
  }

  &.-active {
    button {
      opacity: 1;
      font-weight: 600;
    }
    // background-color: rgba(var(--frontRGB), 0.2);
  }
}

</style>
