import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import Phase from './enum/Phase'

/**
 * Selects phases for the bot.
 */
export default class BotPhaseSelector {

  /**
   * Select two distinct random phases.
   * @returns Selected phases
   */
  public select() : Phase[] {
    const firstPhase = randomEnum(Phase)
    let secondPhase = firstPhase
    while (secondPhase == firstPhase) {
      secondPhase = randomEnum(Phase)
    }
    return [ firstPhase, secondPhase ]
  }

}
