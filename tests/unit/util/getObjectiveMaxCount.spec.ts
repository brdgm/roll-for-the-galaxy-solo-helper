import ObjectiveDifficultyLevel from '@/services/enum/ObjectiveDifficultyLevel'
import getObjectiveMaxCount from '@/util/getObjectiveMaxCount'
import { expect } from 'chai'

describe('util/getObjectiveMaxCount', () => {
  it('getObjectiveMaxCount', () => {
    expect(getObjectiveMaxCount(ObjectiveDifficultyLevel.NORMAL_D10)).to.eq(2)
    expect(getObjectiveMaxCount(ObjectiveDifficultyLevel.HARD_D8)).to.eq(3)
    expect(getObjectiveMaxCount(ObjectiveDifficultyLevel.INSANE_D6)).to.eq(4)
  })
})
