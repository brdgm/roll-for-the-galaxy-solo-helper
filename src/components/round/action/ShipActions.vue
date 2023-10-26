<template>
  <ul v-if="chosenPhase">
    <li v-html="t('roundPhaseExecution.shipActions.tradeFirst')"></li>
    <li v-html="t('roundPhaseExecution.shipActions.consumeNext')"></li>
  </ul>
  <ul v-else>
    <li v-html="t('roundPhaseExecution.shipActions.tradeOnly')"></li>
  </ul>
  <table>
    <tr>
      <th>{{t('roundPhaseExecution.shipActions.priority')}}</th>
      <td v-for="(produceDiceType, index) of produceDiceTypes" :key="produceDiceType">
        <AppIcon type="produce-dice" :name="produceDiceType" extension="svg" class="diceIcon" />
        <span v-if="index < produceDiceTypes.length - 1"> &nbsp;>&nbsp;</span>
      </td>
    </tr>
    <tr>
      <th>{{t('roundPhaseExecution.shipActions.tradeValue')}}</th>
      <td v-for="produceDiceType of produceDiceTypes" :key="produceDiceType">
        ${{getTradeValue(produceDiceType)}}
      </td>
    </tr>
    <tr>
      <th>{{t('roundPhaseExecution.shipActions.botConsumes')}}</th>
      <td v-for="produceDiceType of produceDiceTypes" :key="produceDiceType">
        {{getConsumeVPs(produceDiceType)}} {{t('roundPhaseExecution.shipActions.vps')}}
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'
import ProduceDiceType from '@/services/enum/ProduceDiceType'
import AppIcon from '@/components/structure/AppIcon.vue'
import getTradeValue from '@/util/getTradeValue'
import getConsumeVPs from '@/util/getConsumeVPs'

export default defineComponent({
  name: 'ShipActions',
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
  },
  methods: {
    getTradeValue(produceDiceType : ProduceDiceType) : number {
      return getTradeValue(produceDiceType)
    },
    getConsumeVPs(produceDiceType : ProduceDiceType) : number {
      return getConsumeVPs(produceDiceType, this.navigationState.difficultyLevel)
    }
  }
})
</script>

<style lang="scss" scoped>
.diceIcon {
  width: 2rem;
}
table {
  th {
    padding-right: 20px;
  }
  th {
    font-weight: normal;
  }
}
</style>
