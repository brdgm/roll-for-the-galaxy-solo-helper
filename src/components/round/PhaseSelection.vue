<template>
  <div v-if="!playerPhase && !botPhases">
    <div class="phaseSelection">
      <div v-for="phase of allPhases" class="phase" :key="phase">
        <AppIcon type="phase" :name="phase" @click="selectPlayerPhase(phase)" class="phaseIcon"/>
      </div>
    </div>
    <p>{{t('roundPhaseSelection.pickPhase')}}</p>
  </div>
  <div v-else>
    <div class="phaseSelectionDone">
      <div v-for="phase of allPhases" class="phase" :key="phase">
        <AppIcon :type="isDisabled(phase) ? 'phase-disabled' : 'phase'" :name="phase" class="phaseIcon"/>
      </div>
    </div>
    <p class="selected" v-if="playerPhase">
      {{t('roundPhaseSelection.playerSelected')}}
      <AppIcon type="phase-dice" :name="playerPhase" extension="svg" class="diceIcon"/>,
      {{t('roundPhaseSelection.botSelected')}}
      <AppIcon type="phase-dice" :name="phase" extension="svg" class="diceIcon" v-for="phase of botPhases" :key="phase"/>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'
import AppIcon from '../structure/AppIcon.vue'
import BotPhaseSelector from '@/services/BotPhaseSelector'

export default defineComponent({
  name: 'PhaseSelection',
  components: {
    AppIcon
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  emits: {
    selected: (playerPhase: Phase, botPhases: Phase[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n();
    const state = useStateStore();
    return { t, state };
  },
  data() {
    return {
      playerPhase: undefined as Phase|undefined,
      botPhases: undefined as Phase[]|undefined
    }
  },
  computed: {
    allPhases(): Phase[] {
      return Object.values(Phase);
    }
  },
  methods: {
    selectPlayerPhase(phase: Phase) {
      this.playerPhase = phase
      this.botPhases = new BotPhaseSelector().select()
      this.$emit('selected', this.playerPhase, this.botPhases)
    },
    isDisabled(phase: Phase) {
      if (this.playerPhase && this.botPhases) {
        return !(this.playerPhase == phase || this.botPhases.includes(phase))
      }
      return false
    }
  }
})
</script>

<style lang="scss" scoped>
.phaseSelection, .phaseSelectionDone {
  margin-top: 20px;
  margin-bottom: 10px;
}
.phaseSelection {
  .phaseIcon {
    cursor: pointer;
  }
}
.phase {
  display: inline-block;
  .phaseIcon {
    width: 6em;
    margin-right: 1em;
    margin-bottom: 1em;
  }
}
.diceIcon {
  width: 2rem;
}
p {
  height: 2rem;
  vertical-align: middle;
}
</style>
