<template>
  <p class="alert alert-warning mt-3">
    <span v-html="t('roundPhaseExecution.gainObjectiveActions.gainObjective')"></span>
    <button class="btn btn-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#modalPickObjectiveTile">{{t('roundPhaseExecution.gainObjectiveActions.pickObjective')}}</button>
  </p>

  <ModalDialog id="modalPickObjectiveTile" :title="t('roundPhaseExecution.gainObjectiveActions.pickObjective')">
    <template #body>
      <p id="objectiveTilesLeftGroup" v-html="t('roundPhaseExecution.gainObjectiveActions.tilesLeft')"></p>
      <div class="btn-group" role="group" aria-describedby="objectiveTilesLeftGroup">
        <template v-for="index of 6" :key="index">
          <input type="radio" class="btn-check" name="tilesLeft" :id="`tilesLeft${index}`" autocomplete="off" :value="index" v-model="tilesLeft">
          <label class="btn btn-outline-primary" :for="`tilesLeft${index}`">
            <span>&nbsp;{{index}}&nbsp;</span>
            <span v-if="index==6">{{t('roundPhaseExecution.gainObjectiveActions.tiles')}}&nbsp;</span>
          </label>
        </template>
      </div>
      <p class="mt-3" v-if="pickTile" v-html="t('roundPhaseExecution.gainObjectiveActions.picksTile', {tile:pickTile})"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import rollDice from 'brdgm-commons/src/util/random/rollDice'

export default defineComponent({
  name: 'GainObjectiveActions',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      tilesLeft: undefined as number|undefined,
      pickTile: undefined as number|undefined
    }
  },
  watch: {
    tilesLeft(newValue) {
      this.pickTile = rollDice(newValue)
    }
  },
})
</script>
