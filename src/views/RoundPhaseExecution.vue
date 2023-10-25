<template>
  <h1>{{t('roundPhaseExecution.title', {round, phase})}}</h1>

  <PhaseExecution :navigationState="navigationState"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import PhaseExecution from '@/components/round/PhaseExecution.vue'

export default defineComponent({
  name: 'RoundPhaseExecution',
  components: {
    FooterButtons,
    PhaseExecution
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const round = navigationState.round
    const phase = navigationState.phase
    return { t, state, navigationState, round, phase }
  },
  computed: {
    backButtonRouteTo() {
      if (this.phase > 1) {
        return `/round/${this.round}/phase/${this.phase - 1}`
      }
      else {
        return `/round/${this.round}/selectPhase`
      }
    }
  },
  methods: {
    next() : void {
      if (this.phase >= this.navigationState.selectedPhases.length) {
        this.$router.push(`/round/${this.round + 1}/selectPhase`)
      }
      else {
        this.$router.push(`/round/${this.round}/phase/${this.phase + 1}`)
      }
    }
  }
})
</script>
