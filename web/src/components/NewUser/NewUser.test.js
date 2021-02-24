import { render } from '@redwoodjs/testing'

import NewUser from './NewUser'

describe('NewUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUser />)
    }).not.toThrow()
  })
})
