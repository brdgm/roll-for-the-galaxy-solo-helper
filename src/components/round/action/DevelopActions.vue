<template>
  <ul>
    <li>Bot <b>completes the top development</b> if he has enough credits to pay for it.</li>
  </ul>
  <p>Bot will <i>never benefit from any bonus</i> earned through developments. They will only serve as VPs at game end.</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'

export default defineComponent({
  name: 'DevelopActions',
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
