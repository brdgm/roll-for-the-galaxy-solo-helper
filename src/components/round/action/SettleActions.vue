<template>
  <ul>
    <li>Bot completes his topmost world by paying an amount of credits equal to the world’s value, if he has enough.</li>
  </ul>
  <p>Bot will never <i>gain new dice</i> and <i>never benefit from any bonus</i> through worlds.</p>
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
