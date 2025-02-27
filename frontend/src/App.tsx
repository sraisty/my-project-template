import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ProgressBarController } from './components/ProgressBarController'

export const App = () => {
  return (
    <>
      <div className="flex flex-row">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl text-blue-500">Vite + React</h1>
      <h2 className="text-1xl text-red-300">My Progress Bar</h2>
      <ProgressBarController />
    </>
  )
}
