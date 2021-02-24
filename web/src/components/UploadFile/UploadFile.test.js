import { render } from '@redwoodjs/testing'

import UploadFile from './UploadFile'

describe('UploadFile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadFile />)
    }).not.toThrow()
  })
})
