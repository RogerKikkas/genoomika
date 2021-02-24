import { render } from '@redwoodjs/testing'

import EditUserPage from './EditUserPage'

describe('EditUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUserPage />)
    }).not.toThrow()
  })
})
