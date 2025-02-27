import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {App} from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const container = document.getElementById('root')
const root = ReactDOM.createRoot(container as ReactDOM.Container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
