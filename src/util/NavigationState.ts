import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { State } from "@/store/state"
import { RouteLocation } from "vue-router"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly round : number

  constructor(route : RouteLocation, state : State) {    
    this.difficultyLevel = state.setup.difficultyLevel

    this.round = parseInt(route.params['round'] as string)
  }

}
