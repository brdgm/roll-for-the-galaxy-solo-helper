import DifficultyLevel from "@/services/enum/DifficultyLevel"
import Phase from "@/services/enum/Phase"
import { State } from "@/store/state"
import { RouteLocation } from "vue-router"
import getSelectedPhases from "./getSelectedPhases"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number
  readonly phase : number
  readonly selectedPhases : Phase[]
  readonly selectedPhase : Phase|undefined
  readonly botPhases : Phase[]
  readonly objectiveGain : boolean

  constructor(route : RouteLocation, state : State) {    
    this.difficultyLevel = state.setup.difficultyLevel

    this.round = parseInt(route.params['round'] as string)
    this.phase = parseInt(route.params['phase'] as string)

    const roundData = state.rounds.find(item => item.round == this.round)
    if (roundData) {
      this.selectedPhases = getSelectedPhases(roundData)
      this.selectedPhase = this.selectedPhases[this.phase - 1]
      this.botPhases = roundData.botPhases
      this.objectiveGain = roundData.objectiveGain ?? false
    }
    else {
      this.selectedPhases = []
      this.selectedPhase = undefined
      this.botPhases = []
      this.objectiveGain = false
    }
  }

}
