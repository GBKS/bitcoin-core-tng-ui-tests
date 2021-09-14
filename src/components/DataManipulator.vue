<template>
  <div class="data-manipulator">
    <label for="status">Status</label>
    <ul>
      <DataManipulatorItem
          v-for="(item, id) in statuses"
          :key="id"
          :activeStatusId="info.statusId"
          :statusId="id"
          :status="item"
          @select="changeStatus"
      />
    </ul>

    // Current
    <template v-if="info.statusId == 'current'">
      <label for="time">Time</label>
      <input
        id="time"
        type="range"
        min="0"
        :max="1440"
        step="1"
        v-model="timeModel"
        @input="changeTime"
      />

      <label for="blockHeight">Block height</label>
      <input
        id="blockHeight"
        type="range"
        min="0"
        :max="info.maxBlockHeight"
        step="1"
        v-model="blockHeightModel"
        @input="changeBlockHeight"
      />
    </template>

    // Syncing
    <template v-if="info.statusId == 'syncing'">
      <label for="syncProgress">Sync progress</label>
      <input
        id="syncProgress"
        type="range"
        min="0"
        max="100"
        step="1"
        v-model="syncProgressModel"
        @input="changeSyncProgress"
      />

      <label for="syncTimeLeft">Sync time left</label>
      <input
        id="syncTimeLeft"
        type="range"
        min="0"
        max="100"
        step="1"
        v-model="syncTimeLeftModel"
        @input="changeSyncTimeLeft"
      />
    </template>

    <label for="syncTimeLeft">Peer status</label>
    <select @change="changePeerStatus" v-model="peerStatusModel">
      <option
        v-for="(item, index) in peerStatuses"
        :key="index"
        :value="item"
        :selected="item == info.peerStatusId"
      >{{ item }}</option>
    </select>

    <hr />

    <label for="syncTimeLeft">Widget 1</label>
    <select @change="changeWidget1" v-model="widget1Model">
      <option
        v-for="(item, index) in widgetOptions"
        :key="index"
        :value="item"
        :selected="item == info.widget1"
      >{{ item }}</option>
    </select>

    <label for="syncTimeLeft">Widget 2</label>
    <select @change="changeWidget2" v-model="widget2Model">
      <option
        v-for="(item, index) in widgetOptions"
        :key="index"
        :value="item"
        :selected="item == info.widget2"
      >{{ item }}</option>
    </select>

  </div>
</template>

<script>
import DataManipulatorItem from '@/components/DataManipulatorItem.vue'

export default {
  name: 'DataManipulator',

  components: {
    DataManipulatorItem
  },

  props: {
    statuses: Object,
    peerStatuses: Array,
    info: Object
  },

  data() {
    const widgetOptions = [
      'transactions',
      'block-time',
      'none'
    ]

    return {
      blockHeightModel: this.info.blockHeight,
      syncProgressModel: this.info.syncProgress,
      syncTimeLeftModel: this.info.syncTimeLeft,
      timeModel: this.info.time,
      peerStatusModel: this.info.peerStatus,
      widget1Model: this.info.widget1,
      widget2Model: this.info.widget2,
      widgetOptions: widgetOptions
    }
  },

  watch: {
    info() {
      this.blockHeightModel = this.info.blockHeight
      this.syncProgressModel = this.info.syncProgress
      this.syncTimeLeftModel = this.info.syncTimeLeft
      this.timeModel = this.info.time
      this.peerStatusModel = this.info.peerStatus
      this.widget1Model = this.info.widget1
      this.widget2Model = this.info.widget2
    }
  },

  methods: {
    changeBlockHeight() {
      this.$emit('changeInfo', 'blockHeight', this.blockHeightModel)
    },

    changeStatus(statusId) {
      this.$emit('changeInfo', 'statusId', statusId)
    },
    
    changeSyncProgress() {
      this.$emit('changeInfo', 'syncProgress', this.syncProgressModel)
    },
    
    changeSyncTimeLeft() {
      this.$emit('changeInfo', 'syncTimeLeft', this.syncTimeLeftModel)
    },
    
    changeTime() {
      this.$emit('changeInfo', 'time', this.timeModel)
    },
    
    changePeerStatus() {
      this.$emit('changeInfo', 'peerStatusId', this.peerStatusModel)
    },
    
    changeWidget1() {
      this.$emit('changeInfo', 'widget1', this.widget1Model)
    },
    
    changeWidget2() {
      this.$emit('changeInfo', 'widget2', this.widget2Model)
    }
  }
}
</script>


<style scoped lang="scss">

.data-manipulator {
  width: 300px;
  border-right: 1px solid rgba(var(--frontRGB), 0.2);
  padding: 40px;

  ul {
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      padding: 0;
    }
  }

  label {
    display: block;
    color: var(--front);
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: 600;

    &:first-child {
      margin-top: 0;
    }
  }

  input[type=range],
  select {
    display: block;
    width: 100%;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border-width: 0;
    height: 1px;
    background-color: rgba(var(--frontRGB), 0.5);
  }
}

</style>
