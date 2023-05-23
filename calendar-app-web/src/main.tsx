import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { CalendarApp } from './CalendarApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  </React.StrictMode>,
)
