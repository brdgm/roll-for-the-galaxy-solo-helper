<template>
  <h3 class="mt-4 mb-3">{{t('setup.modules.title')}}</h3>

  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="moduleObjective" :checked="hasObjectiveModule" @input="toggleObjectiveModule">
        <label class="form-check-label" for="moduleObjective" v-html="t('setup.modules.objective')"></label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Module from '@/services/enum/Module'
import { useStateStore } from '@/store/state'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

export default defineComponent({
  name: 'ModuleSetup',
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
    toggleObjectiveModule() {
      toggleArrayItem(this.state.setup.modules, Module.OBJECTIVE)
    }
  }
})
</script>
