<template>
  <ul v-if="chosenPhase">
    <li>Bot <b>draws 1 tile</b>, places it as either a world or development at the bottom of whichever construction zone stack is the shortest. Place tile as a world in case of a tie.</li>
    <li>Bot <b>earns $2.</b></li>
  </ul>
  <ul v-else>
    <li>Bot <b>draws 1 tile</b>, places it as either a world or development at the bottom of whichever construction zone stack is the shortest. Place tile as a world in case of a tie.</li>
    <li>Bot <b>earns $1.</b></li>
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
