<template>
  <ul v-if="chosenPhase">
    <li v-html="t('roundPhaseExecution.produceActions.produceWorlds', {amount:2}, 2)"></li>
  </ul>
  <ul v-else>
    <li v-html="t('roundPhaseExecution.produceActions.produceWorlds', {amount:1}, 1)"></li>
  </ul>
  <p>{{t('roundPhaseExecution.produceActions.priority')}}
    <template v-for="(produceDiceType, index) of produceDiceTypes" :key="produceDiceType">
      <span v-if="index > 0"> > </span>
      <AppIcon type="produce-dice" :name="produceDiceType" extension="svg" class="diceIcon" />
    </template>.
  </p>
  <p v-html="t('roundPhaseExecution.produceActions.notes')"></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'
import ProduceDiceType from '@/services/enum/ProduceDiceType'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ProduceActions',
  components: {
    AppIcon
  },
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
  },
  computed: {
    produceDiceTypes(): ProduceDiceType[] {
      return Object.values(ProduceDiceType).reverse()
    }
  }
})
</script>

<style lang="scss" scoped>
.diceIcon {
  width: 2rem;
}
</style>
