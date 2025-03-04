import { render, screen, fireEvent } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  it('renders the progress bar with the correct width', () => {
    render(
      <ProgressBar
        percentDone={0.5}
        onClickReset={vi.fn()}
        onClickUpdate={vi.fn()}
      />
    )
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar.firstChild?.firstChild?.textContent).toEqual('50%')
  })

  it('calls onClickReset when the Reset button is clicked', () => {
    const mockReset = vi.fn()
    render(
      <ProgressBar
        percentDone={0.5}
        onClickReset={mockReset}
        onClickUpdate={vi.fn()}
      />
    )

    fireEvent.click(screen.getByText('Reset'))
    expect(mockReset).toHaveBeenCalledTimes(1)
  })

  it('calls onClickUpdate when the Increase Percent Done button is clicked', () => {
    const mockUpdate = vi.fn()
    render(
      <ProgressBar
        percentDone={0.5}
        onClickReset={vi.fn()}
        onClickUpdate={mockUpdate}
      />
    )

    fireEvent.click(screen.getByText('Increase Percent Done'))
    expect(mockUpdate).toHaveBeenCalledTimes(1)
  })
})
