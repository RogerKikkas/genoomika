import { render } from '@redwoodjs/testing'

import Visits from './Visits'

describe('Visits', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Visits />)
    }).not.toThrow()
  })
})
