<template>
  <div class="phaseExecution">
    <div v-for="phase of allPhases" class="phase" :key="phase">
      <AppIcon type="phase" :name="phase" class="phaseIcon"
          :class="{active:isActive(phase),inactive:!isActive(phase)}"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import Phase from '@/services/enum/Phase'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'PhaseExecution',
  components: {
    AppIcon
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  setup() {
    const { t } = useI18n();
    const state = useStateStore();
    return { t, state };
  },
  computed: {
    allPhases(): Phase[] {
      return this.navigationState.selectedPhases
    }
  },
  methods: {
    isActive(phase: Phase) {
      return this.navigationState.selectedPhase == phase
    }
  }
})
</script>

<style lang="scss" scoped>
.phaseExecution {
  margin-top: 20px;
  margin-bottom: 10px;
}
.phase {
  display: inline-block;
  .phaseIcon {
    width: 6em;
    margin-right: 1em;
    margin-bottom: 1em;
    &.active {
      outline: 6px solid orange;
    }
    &.inactive {
      opacity: 60%;
    }
  }
}
</style>
