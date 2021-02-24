import { visits } from './visits'

describe('visits', () => {
  scenario('returns all visits', async (scenario) => {
    const result = await visits()

    expect(result.length).toEqual(Object.keys(scenario.visit).length)
  })
})
