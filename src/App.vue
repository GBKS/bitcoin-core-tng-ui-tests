<template>
  <div class="wrap">
    <DataManipulator 
      :info="info"
      :statuses="statuses"
      :peerStatuses="peerStatuses"
      @changeInfo="changeInfo"
    />
    <div class="ui">
      <BlockClock
        :statusId="info.statusId"
        :info="info"
      />
      <div class="row">
        <BlockTimeBox
          :statusId="info.statusId"
          :info="info"
        />
        <TransactionsBox
          :statusId="info.statusId"
          :info="info"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BlockClock from './components/BlockClock.vue'
import BlockTimeBox from './components/blockTime/BlockTimeBox.vue'
import TransactionsBox from './components/transactions/TransactionsBox.vue'
import DataManipulator from './components/DataManipulator.vue'

export default {
  name: 'App',

  components: {
    BlockClock,
    BlockTimeBox,
    TransactionsBox,
    DataManipulator
  },

  data() {
    const statuses = {
      connecting: {
        title: 'Connecting',
        description: 'Please wait'
      },
      syncing: {
        title: 'sync-progress',
        description: 'sync-time-left'
      },
      current: {
        title: 'block-height',
        description: 'Latest block'
      },
      pausedManual: {
        title: 'Paused',
        description: 'Tap to start'
      },
      pausedNoWiFi: {
        title: 'Paused',
        description: 'No wi-fi'
      },
      pausedOnBattery: {
        title: 'Paused',
        description: 'Not plugged in'
      },
      errorSystemClock: {
        title: 'Error',
        description: 'System clock'
      },
      errorGeneric: {
        title: 'Error',
        description: 'Tap for details'
      }
    }

    const peerStatuses = [
      'error',
      'connecting',
      'p_0',
      'p_20',
      'p_40',
      'p_60',
      'p_80',
      'p_100'
    ]

    const statusId = 'current'
    const peerStatusId = 'p_80'

    const now = new Date()
    const minutesNow = now.getHours() * 60 + now.getMinutes()

    // Prepare a list of blocks to show in the dial
    const blocks = []
    let minutes = 0
    let minutesTotal = 0
    let counter = 0
    while(minutesTotal < 1440) {
      minutes = Math.floor(Math.random() * 30 + 5)
      // minutes = 60

      blocks.push({
        index: counter,
        minute: minutesTotal,
        transactions: Math.round(Math.random() * 3000 + 1000)
      })

      minutesTotal += minutes
      counter ++
    }

    return {
      statuses: statuses,
      peerStatuses: peerStatuses,
      info:  {
        statusId: statusId,
        status: statuses[statusId],
        peerStatusId: peerStatusId,
        peerStatus: peerStatuses[peerStatusId],
        maxBlockHeight: 725165,
        time: minutesNow, // Minutes since midnight
        blockHeight: 123456,  // Current
        blocks: blocks,
        syncProgress: 95,
        syncTimeLeft: 12,
        peers: [
          {
            status: 'connected'
          },
          {
            status: 'connected'
          },
          {
            status: 'connected'
          },
          {
            status: 'connected'
          },
          {
            status: 'connected'
          }
        ]
      }
    }
  },

  methods: {
    changeInfo(key, value) {
      this.info[key] = value

      // console.log('changeInfo', key, value)

      if(key == 'statusId') {
        this.info.status = this.statuses[value]
        
        // console.log('status', this.statuses[value])
      } else if(key == 'peerStatusId') {
        this.info.peerStatus = this.peerStatuses[value]
        
        // console.log('status', this.statuses[value])
      }
    },

    tick() {
      if(this.info.statusId == 'syncing') {
        this.tickSyncing()
      } else {
        this.tickCurrent()
      }
    },

    tickSyncing() {
      
    },

    tickCurrent() {
      
    }
  }
}
</script>

<style lang="scss">

@import "scss/fonts.scss";
@import "scss/variables.scss";
@import "scss/mixins.scss";
@import "scss/animations.scss";
@import "scss/normalize.scss";

#app {
  background-color: var(--back);
  transition: background-color 250ms $ease;
  width: 100%;

  > .wrap {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: stretch;
    min-height: 100vh;

    .ui {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .row {
        margin-top: 25px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
