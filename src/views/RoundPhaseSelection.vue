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
import { useStateStore } from '@/store/state'
import PhaseSelection from '@/components/round/PhaseSelection.vue'
import NavigationState from '@/util/NavigationState'
import getSelectedPhases from '@/util/getSelectedPhases'
import Phase from '@/services/enum/Phase'

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
      this.state.storeRound({round: this.round, playerPhase, botPhases})
      this.selectedPhasesStored = true
    }
  }
})
</script>
