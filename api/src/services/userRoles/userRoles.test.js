import { userRoles } from './userRoles'

describe('userRoles', () => {
  scenario('returns all userRoles', async (scenario) => {
    const result = await userRoles()

    expect(result.length).toEqual(Object.keys(scenario.userRole).length)
  })
})
