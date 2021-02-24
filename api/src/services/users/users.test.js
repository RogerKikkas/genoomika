import { users, user, createUser, updateUser, deleteUser } from './users'

describe('users', () => {
  scenario('returns all users', async (scenario) => {
    const result = await users()

    expect(result.length).toEqual(Object.keys(scenario.user).length)
  })

  scenario('returns a single user', async (scenario) => {
    const result = await user({ id: scenario.user.one.id })

    expect(result).toEqual(scenario.user.one)
  })

  scenario('creates a user', async (scenario) => {
    const result = await createUser({
      input: { email: 'String6659799', password: 'String' },
    })

    expect(result.email).toEqual('String6659799')
    expect(result.password).toEqual('String')
  })

  scenario('updates a user', async (scenario) => {
    const original = await user({ id: scenario.user.one.id })
    const result = await updateUser({
      id: original.id,
      input: { email: 'String60716202' },
    })

    expect(result.email).toEqual('String60716202')
  })

  scenario('deletes a user', async (scenario) => {
    const original = await deleteUser({ id: scenario.user.one.id })
    const result = await user({ id: original.id })

    expect(result).toEqual(null)
  })
})
