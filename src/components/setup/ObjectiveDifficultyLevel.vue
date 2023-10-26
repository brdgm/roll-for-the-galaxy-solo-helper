<template>
  <h3 class="mt-4 mb-3">{{t('setup.objectiveDifficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.objectiveDifficultyLevel.easy')}}</label>
    </div>
    <div class="col-8 col-md-4">
      <input type="range" class="form-range" min="1" max="3" id="difficultyLevel"
          :value="objectiveDifficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.objectiveDifficultyLevel.hard')}}</label>
    </div>
  </div>  
  <div class="row">
    <div class="col-11 offset-1">
      <i>{{t('objectiveDifficultyLevel.' + objectiveDifficultyLevel)}}</i>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'ObjectiveDifficultyLevel',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const objectiveDifficultyLevel = ref(state.setup.objectiveDifficultyLevel)
    return { t, state, objectiveDifficultyLevel }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      this.objectiveDifficultyLevel = parseInt((event.target as HTMLInputElement).value)
      this.state.setup.objectiveDifficultyLevel = this.objectiveDifficultyLevel
    }
  }
})
</script>
