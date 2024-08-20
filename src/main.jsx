import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import GlobalInfoProvider from './context/GlobalInfo'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalInfoProvider>
      <App />
    </GlobalInfoProvider>
  </React.StrictMode>,
)
