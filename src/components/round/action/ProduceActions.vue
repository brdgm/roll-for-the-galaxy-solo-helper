<template>
  <ul v-if="chosenPhase">
    <li>Bot <b>produces on his 2 highest color</b> value available worlds.</li>
  </ul>
  <ul v-else>
    <li>Bot <b>produces on his 1 highest color</b> value available world.</li>
  </ul>
  <p>Priority: <i>yellow > green > brown > blue</i>. Use any die from the supply to serve as the produced good.</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'

export default defineComponent({
  name: 'ProduceActions',
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
