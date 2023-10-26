<template>
  <div class="phaseExecution" v-if="navigationState.selectedPhase">
    <div v-for="phase of allPhases" class="phase" :key="phase">
      <AppIcon type="phase" :name="phase" class="phaseIcon"
          :class="{active:isActive(phase),inactive:!isActive(phase)}"/>
    </div>
    <p>{{t('roundPhaseExecution.botActions')}}</p>
    <component :is="`${selectedBotPhase}Actions`"
        :phase="selectedBotPhase"
        :chosenPhase="isChosenPhase(navigationState.selectedPhase)"
        :navigationState="navigationState"/>   
  </div>

  <button class="btn btn-success btn-lg mt-4" @click="completed()">
    {{t('roundPhaseExecution.completed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4 ms-2" @click="notPossible()" v-if="!isExploreBotPhase">
    {{t('roundPhaseExecution.notPossible')}}
  </button>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'
import AppIcon from '../structure/AppIcon.vue'
import ExploreActions from './action/ExploreActions.vue'
import DevelopActions from './action/DevelopActions.vue'
import SettleActions from './action/SettleActions.vue'
import ProduceActions from './action/ProduceActions.vue'
import ShipActions from './action/ShipActions.vue'
import getAlternativeBotPhase from '@/util/getAlternativeBotPhase'

export default defineComponent({
  name: 'PhaseExecution',
  components: {
    AppIcon,
    ExploreActions,
    DevelopActions,
    SettleActions,
    ProduceActions,
    ShipActions
  },
  emits: ['next'],
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      alternativeBotPhase: undefined as Phase|undefined
    }
  },
  computed: {
    allPhases(): Phase[] {
      return this.navigationState.selectedPhases
    },
    isExploreBotPhase() : boolean {
      return this.selectedBotPhase == Phase.EXPLORE
    },
    selectedBotPhase() : Phase {
      if (this.alternativeBotPhase) {
        return this.alternativeBotPhase
      }
      return this.navigationState.selectedPhase || Phase.EXPLORE
    }
  },
  methods: {
    isActive(phase: Phase) : boolean {
      return this.navigationState.selectedPhase == phase
    },
    isChosenPhase(phase: Phase) : boolean {
      if (this.alternativeBotPhase) {
        return false
      }
      return this.navigationState.botPhases.includes(phase)
    },
    completed() {
      this.$emit('next')
    },
    notPossible() {
      this.alternativeBotPhase = getAlternativeBotPhase(this.selectedBotPhase)
    }
  }
})
</script>

<style lang="scss" scoped>
.phaseExecution {
  margin-top: 20px;
  margin-bottom: 10px;
}
.phase {
  display: inline-block;
  .phaseIcon {
    width: 6em;
    margin-right: 1em;
    margin-bottom: 1em;
    &.active {
      outline: 6px solid orange;
    }
    &.inactive {
      opacity: 60%;
    }
  }
}
</style>
