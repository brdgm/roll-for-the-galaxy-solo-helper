import ObjectiveDifficultyLevel from '@/services/enum/ObjectiveDifficultyLevel'
import getObjectiveDiceRoll from '@/util/getObjectiveDiceRoll'
import { expect } from 'chai'

describe('util/getObjectiveDiceRoll', () => {
  it('getObjectiveDiceRoll', () => {
    expect(getObjectiveDiceRoll(ObjectiveDifficultyLevel.NORMAL_D10)).to.eq(10)
    expect(getObjectiveDiceRoll(ObjectiveDifficultyLevel.HARD_D8)).to.eq(8)
    expect(getObjectiveDiceRoll(ObjectiveDifficultyLevel.INSANE_D6)).to.eq(6)
  })
})
