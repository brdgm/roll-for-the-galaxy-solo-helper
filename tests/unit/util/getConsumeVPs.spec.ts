import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ProduceDiceType from '@/services/enum/ProduceDiceType'
import getConsumeVPs from '@/util/getConsumeVPs'
import { expect } from 'chai'

describe('util/getTradeValue', () => {
  it('NORMAL', () => {
    const difficultyLevel = DifficultyLevel.NORMAL
    expect(getConsumeVPs(ProduceDiceType.NOVELTY, difficultyLevel)).to.eq(2)
    expect(getConsumeVPs(ProduceDiceType.RARE_ELEMENTS, difficultyLevel)).to.eq(2)
    expect(getConsumeVPs(ProduceDiceType.GENES, difficultyLevel)).to.eq(3)
    expect(getConsumeVPs(ProduceDiceType.ALIEN, difficultyLevel)).to.eq(3)
  })

  it('ADVANCED', () => {
    const difficultyLevel = DifficultyLevel.ADVANCED
    expect(getConsumeVPs(ProduceDiceType.NOVELTY, difficultyLevel)).to.eq(2)
    expect(getConsumeVPs(ProduceDiceType.RARE_ELEMENTS, difficultyLevel)).to.eq(3)
    expect(getConsumeVPs(ProduceDiceType.GENES, difficultyLevel)).to.eq(4)
    expect(getConsumeVPs(ProduceDiceType.ALIEN, difficultyLevel)).to.eq(5)
  })

  it('EXPERT', () => {
    const difficultyLevel = DifficultyLevel.EXPERT
    expect(getConsumeVPs(ProduceDiceType.NOVELTY, difficultyLevel)).to.eq(3)
    expect(getConsumeVPs(ProduceDiceType.RARE_ELEMENTS, difficultyLevel)).to.eq(4)
    expect(getConsumeVPs(ProduceDiceType.GENES, difficultyLevel)).to.eq(5)
    expect(getConsumeVPs(ProduceDiceType.ALIEN, difficultyLevel)).to.eq(6)
  })

  it('PROFESSIONAL', () => {
    const difficultyLevel = DifficultyLevel.PROFESSIONAL
    expect(getConsumeVPs(ProduceDiceType.NOVELTY, difficultyLevel)).to.eq(3)
    expect(getConsumeVPs(ProduceDiceType.RARE_ELEMENTS, difficultyLevel)).to.eq(4)
    expect(getConsumeVPs(ProduceDiceType.GENES, difficultyLevel)).to.eq(5)
    expect(getConsumeVPs(ProduceDiceType.ALIEN, difficultyLevel)).to.eq(6)
  })
})
