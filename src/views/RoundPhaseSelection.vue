<template>
  <h1>{{t('roundPhaseSelection.title', {round})}}</h1>

  <PhaseSelection :navigationState="navigationState" @selected="phasesSelected"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()" v-if="selectedPhasesStored">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="round > 1 ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { Round, useStateStore } from '@/store/state'
import PhaseSelection from '@/components/round/PhaseSelection.vue'
import NavigationState from '@/util/NavigationState'
import getSelectedPhases from '@/util/getSelectedPhases'
import Phase from '@/services/enum/Phase'
import ObjectiveDifficultyLevel from '@/services/enum/ObjectiveDifficultyLevel'
import rollDice from 'brdgm-commons/src/util/random/rollDice'

export default defineComponent({
  name: 'RoundPhaseSelection',
  components: {
    FooterButtons,
    PhaseSelection
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const round = navigationState.round
    return { t, state, navigationState, round }
  },
  data() {
    return {
      selectedPhasesStored: false
    }
  },
  computed: {
    backButtonRouteTo() {
      const previousRoundData = this.state.rounds.find(item => item.round == this.round - 1)
      if (previousRoundData) {
        return `/round/${previousRoundData.round}/phase/${getSelectedPhases(previousRoundData).length}`
      }
      return undefined
    }
  },
  methods: {
    next() : void {
      this.$router.push(`/round/${this.round}/phase/1`)
    },
    phasesSelected(playerPhase: Phase, botPhases: Phase[]) : void {
      const round : Round = {round: this.round, playerPhase, botPhases}

      // check if objective is gained - limit to max. 2
      const gainedObjectives = this.state.rounds.filter(item => item.round < this.round && item.objectiveGain).length
      if (gainedObjectives < 2) {
        let objectiveDice
        switch (this.state.setup.objectiveDifficultyLevel) {
          case ObjectiveDifficultyLevel.HARD_D8:
            objectiveDice = 8
            break
          case ObjectiveDifficultyLevel.INSANE_D6:
            objectiveDice = 6
            break
          default:
            objectiveDice = 10
            break
        }
        if (rollDice(objectiveDice) == 1) {
          round.objectiveGain = true
        }
      }

      this.state.storeRound(round)
      this.selectedPhasesStored = true
    }
  }
})
</script>
