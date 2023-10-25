import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ObjectiveDifficultyLevel from '@/services/enum/ObjectiveDifficultyLevel'
import Module from '@/services/enum/Module'
import Phase from '@/services/enum/Phase'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.NORMAL,
        objectiveDifficultyLevel: ObjectiveDifficultyLevel.NORMAL_D10,
        modules: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round != round.round)
      this.rounds.push(round)
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  objectiveDifficultyLevel: ObjectiveDifficultyLevel
  modules: Module[]
}
export interface Round {
  round: number
  playerPhase: Phase
  botPhases: Phase[]
}
