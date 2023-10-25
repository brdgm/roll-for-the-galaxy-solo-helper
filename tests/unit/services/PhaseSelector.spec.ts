import PhaseSelector from '@/services/PhaseSelector'
import { expect } from 'chai'

describe('services/PhaseSelector', () => {
  it('select', () => {
    const phases = new PhaseSelector().select()

    expect(phases.length).to.eq(2)
    expect(phases[0]).to.not.eq(phases[1])
  })
})
