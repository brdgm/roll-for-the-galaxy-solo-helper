import Phase from '@/services/enum/Phase'
import getSelectedPhases from '@/util/getSelectedPhases'
import { expect } from 'chai'

describe('util/getSelectedPhases', () => {
  it('3-phases', () => {
    const phases = getSelectedPhases({round:1, playerPhase:Phase.DEVELOP, botPhases:[Phase.SHIP,Phase.EXPLORE]})    

    expect([Phase.EXPLORE,Phase.DEVELOP,Phase.SHIP]).to.eql(phases)
  })

  it('2-phases', () => {
    const phases = getSelectedPhases({round:1, playerPhase:Phase.SETTLE, botPhases:[Phase.SETTLE,Phase.DEVELOP]})    

    expect([Phase.DEVELOP,Phase.SETTLE]).to.eql(phases)
  })
})
