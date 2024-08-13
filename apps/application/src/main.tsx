import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//@ts-expect-error since app is JS
import App from './App.jsx' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
