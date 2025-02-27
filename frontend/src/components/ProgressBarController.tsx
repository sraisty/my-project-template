import { useState } from 'react'
import { ProgressBar } from './ProgressBar'

export const ProgressBarController = () => {
  const [percentDone, setPercentDone] = useState<number>(0)

  const onClickReset = () => {
    setPercentDone(0)
  }

  const onClickUpdateProgress = () => {
    const percent = percentDone + 0.1 > 1 ? 1 : percentDone + 0.1
    setPercentDone(percent)
  }

  return (
    <ProgressBar
      percentDone={percentDone}
      onClickReset={onClickReset}
      onClickUpdate={onClickUpdateProgress}
    />
  )
}
