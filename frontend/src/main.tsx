import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container as ReactDOM.Container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
