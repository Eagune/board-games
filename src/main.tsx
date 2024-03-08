import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import 'virtual:svg-icons-register';

import './style/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
