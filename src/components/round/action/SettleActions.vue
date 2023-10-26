<template>
  <ul>
    <li v-html="t('roundPhaseExecution.settleActions.completeWorld')"></li>
  </ul>
  <p v-html="t('roundPhaseExecution.settleActions.notes')"></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'

export default defineComponent({
  name: 'SettleActions',
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
