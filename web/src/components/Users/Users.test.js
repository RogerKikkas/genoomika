import { render } from '@redwoodjs/testing'

import Users from './Users'

describe('Users', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Users />)
    }).not.toThrow()
  })
})
