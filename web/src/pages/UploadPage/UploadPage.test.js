import { render } from '@redwoodjs/testing'

import UploadPage from './UploadPage'

describe('UploadPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadPage />)
    }).not.toThrow()
  })
})
