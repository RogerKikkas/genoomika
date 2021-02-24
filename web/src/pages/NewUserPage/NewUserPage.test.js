import { render } from '@redwoodjs/testing'

import NewUserPage from './NewUserPage'

describe('NewUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewUserPage />)
    }).not.toThrow()
  })
})
