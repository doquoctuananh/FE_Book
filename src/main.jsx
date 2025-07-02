import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalStyle from '~components/GlobalStyle/GlobalStyle.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <GlobalStyle>
        <App />
      </GlobalStyle>
  // </StrictMode>,
)
