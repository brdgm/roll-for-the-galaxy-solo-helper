<template>
  <h1>{{t('setup.title')}}</h1>

  <h3 class="mt-4 mb-3">{{t('setup.general.title')}}</h3>
  <ul>
    <li v-html="t('setup.general.setup2Players')"></li>
    <li v-html="t('setup.general.botPlayerMat')"></li>
    <li v-html="t('setup.general.botNoHomeWorld')"></li>
    <li v-html="t('setup.general.botDrawTiles')"></li>
  </ul>

  <ModuleSetup/>
  <DifficultyLevel/>
  <ObjectiveDifficultyLevel v-if="hasObjectiveModule"/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import ModuleSetup from '@/components/setup/ModuleSetup.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ObjectiveDifficultyLevel from '@/components/setup/ObjectiveDifficultyLevel.vue'
import Module from '@/services/enum/Module'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    ModuleSetup,
    DifficultyLevel,
    ObjectiveDifficultyLevel
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    hasObjectiveModule() : boolean {
      return this.state.setup.modules.includes(Module.OBJECTIVE)
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.$router.push('/round/1/selectPhase')
    }
  }
})
</script>
