import { render } from '@redwoodjs/testing'

import Menu from './Menu'

describe('Menu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Menu />)
    }).not.toThrow()
  })
})
