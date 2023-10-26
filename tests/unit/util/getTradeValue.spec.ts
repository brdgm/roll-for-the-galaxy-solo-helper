import ProduceDiceType from '@/services/enum/ProduceDiceType'
import getTradeValue from '@/util/getTradeValue'
import { expect } from 'chai'

describe('util/getTradeValue', () => {
  it('trade values', () => {
    expect(getTradeValue(ProduceDiceType.NOVELTY)).to.eq(3)
    expect(getTradeValue(ProduceDiceType.RARE_ELEMENTS)).to.eq(4)
    expect(getTradeValue(ProduceDiceType.GENES)).to.eq(5)
    expect(getTradeValue(ProduceDiceType.ALIEN)).to.eq(6)
  })
})
