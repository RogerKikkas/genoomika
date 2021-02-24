import { render } from '@redwoodjs/testing'

import UserLayout from './UserLayout'

describe('UserLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserLayout />)
    }).not.toThrow()
  })
})
