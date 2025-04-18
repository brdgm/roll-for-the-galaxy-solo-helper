<template>
  <h1 id="endGameScoringTitle">{{t('endGameScoring.title')}}</h1>

  <table aria-describedby="endGameScoringTitle">
    <tbody>
      <tr>
        <th scope="col"></th>
        <th scope="col">{{t('endGameScoring.player')}}</th>
        <th scope="col">{{t('endGameScoring.bot')}}</th>
      </tr>
      <tr>
        <th scope="row">{{t('endGameScoring.vpChips')}}</th>
        <td><NumberInput v-model="playerVPChips"/></td>
        <td><NumberInput v-model="botVPChips"/></td>
      </tr>
      <tr>
        <th scope="row">{{t('endGameScoring.vpDevelopmentWorld')}}</th>
        <td><NumberInput v-model="playerVPDevelopmentWorlds"/></td>
        <td><NumberInput v-model="botVPDevelopmentWorlds"/></td>
      </tr>
      <tr>
        <th scope="row">{{t('endGameScoring.vp6PlusBonus')}}</th>
        <td><NumberInput v-model="playerVP6PlusWorlds"/></td>
        <td v-if="isProfessionalDifficultyLevel"><NumberInput v-model="botVP6PlusWorlds"/></td>
        <td v-else></td>
      </tr>
      <tr v-if="isObjectivesModule">
        <th scope="row">{{t('endGameScoring.talentCounters')}}</th>
        <td><NumberInput v-model="playerTalentCounters"/></td>
        <td><NumberInput v-model="botTalentCounters"/></td>
      </tr>
      <tr>
        <th scope="row">{{t('endGameScoring.total')}}</th>
        <td><b>{{totalPlayer}} {{t('endGameScoring.vps')}}</b></td>
        <td><b>{{totalBot}} {{t('endGameScoring.vps')}}</b></td>
      </tr>
    </tbody>
  </table>

  <p class="mt-3">
    {{t('endGameScoring.difficultyLevel')}} <b>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</b>
    <span v-if="isObjectivesModule">
      <br/>
      {{t('endGameScoring.objectiveDifficultyLevel')}} <b>{{t(`objectiveDifficultyLevel.${state.setup.objectiveDifficultyLevel}`,
          {diceRoll:getDiceRoll(state.setup.objectiveDifficultyLevel),maxCount:getMaxCount(state.setup.objectiveDifficultyLevel)})}}</b>
    </span>
  </p>

  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import Module from '@/services/enum/Module'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import getObjectiveMaxCount from '@/util/getObjectiveMaxCount'
import getObjectiveDiceRoll from '@/util/getObjectiveDiceRoll'
import ObjectiveDifficultyLevelEnum from '@/services/enum/ObjectiveDifficultyLevel'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'EndGameScoring',
  components: {
    FooterButtons,
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      playerVPChips: 0,
      playerVPDevelopmentWorlds: 0,
      playerVP6PlusWorlds: 0,
      playerTalentCounters: 0,
      botVPChips: 0,
      botVPDevelopmentWorlds: 0,
      botVP6PlusWorlds: 0,
      botTalentCounters: 0
    }
  },
  computed: {
    totalPlayer() : number {
      return toNumber(this.playerVPChips) + toNumber(this.playerVPDevelopmentWorlds) + toNumber(this.playerVP6PlusWorlds) + toNumber(this.playerTalentCounters)
    },
    totalBot() : number {
      return toNumber(this.botVPChips) + toNumber(this.botVPDevelopmentWorlds) + toNumber(this.botVP6PlusWorlds) + toNumber(this.botTalentCounters)
    },
    isObjectivesModule() : boolean {
      return this.state.setup.modules.includes(Module.OBJECTIVE)
    },
    isProfessionalDifficultyLevel() : boolean {
      return this.state.setup.difficultyLevel == DifficultyLevel.PROFESSIONAL
    }
  },
  methods: {
    getDiceRoll(objectiveDifficultyLevel : ObjectiveDifficultyLevelEnum) : number {
      return getObjectiveDiceRoll(objectiveDifficultyLevel)
    },
    getMaxCount(objectiveDifficultyLevel : ObjectiveDifficultyLevelEnum) : number {
      return getObjectiveMaxCount(objectiveDifficultyLevel)
    }
  }
})
</script>

<style lang="scss" scoped>
th, td {
  text-align: center;
  padding: 0.5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  white-space: nowrap;
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
