import Phase from '@/services/enum/Phase'
import getAlternativeBotPhase from '@/util/getAlternativeBotPhase'
import { expect } from 'chai'

describe('util/getAlternativeBotPhase', () => {
  it('getAlternativeBotPhase', () => {
    expect(getAlternativeBotPhase(Phase.EXPLORE)).to.eq(Phase.DEVELOP)
    expect(getAlternativeBotPhase(Phase.DEVELOP)).to.eq(Phase.SETTLE)
    expect(getAlternativeBotPhase(Phase.SETTLE)).to.eq(Phase.PRODUCE)
    expect(getAlternativeBotPhase(Phase.PRODUCE)).to.eq(Phase.SHIP)
    expect(getAlternativeBotPhase(Phase.SHIP)).to.eq(Phase.EXPLORE)
  })
})
