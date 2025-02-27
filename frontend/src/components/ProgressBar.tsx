import React from 'react'

export const ProgressBar = ({
  percentDone,
  onClickReset,
  onClickUpdate,
}: {
  percentDone: number
  onClickReset: () => void
  onClickUpdate: () => void
}) => {
  const percent = `${Math.round(percentDone * 100)}%`

  const pbBackgroundStyle: React.CSSProperties = {
    height: '30px',
    width: '100%',
    backgroundColor: '#444444',
    borderColor: '#444444',
    borderRadius: '8px',
    margin: '24 0 24 0',
  }

  const pbBarStyle: React.CSSProperties = {
    width: percent,
    backgroundColor: '#FFFFFF',
    borderColor: '#444444',
    borderRadius: '8px',
    borderStyle: 'solid',
    position: 'relative',
    top: 1,
    left: 1,
    height: 'calc(100% - 2px)',
  }
  return (
    <div>
      <div style={pbBackgroundStyle}>
        <div style={pbBarStyle}>
          <span style={{ marginLeft: 24, padding: 10 }}>{percent}</span>
        </div>
      </div>
      <div>
        <button onClick={onClickReset}>Reset</button>
        <button onClick={onClickUpdate}>Increase Percent Done</button>
      </div>
    </div>
  )
}
