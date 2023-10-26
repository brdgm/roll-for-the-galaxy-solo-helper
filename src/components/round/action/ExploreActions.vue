<template>
  <ul v-if="chosenPhase">
    <li v-html="t('roundPhaseExecution.exploreActions.drawTile')"></li>
    <li v-html="t('roundPhaseExecution.exploreActions.earnMoney', {amount:2})"></li>
  </ul>
  <ul v-else>
    <li v-html="t('roundPhaseExecution.exploreActions.drawTile')"></li>
    <li v-html="t('roundPhaseExecution.exploreActions.earnMoney', {amount:1})"></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'

export default defineComponent({
  name: 'ExploreActions',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    phase: {
      type: String as PropType<Phase>,
      required: true
    },
    chosenPhase: {
      type: Boolean,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  }
})
</script>
