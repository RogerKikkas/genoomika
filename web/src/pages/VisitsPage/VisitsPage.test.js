import { render } from '@redwoodjs/testing'

import VisitsPage from './VisitsPage'

describe('VisitsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VisitsPage />)
    }).not.toThrow()
  })
})
