import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'

// 1. Puxando os estilos principais da pasta styles
import './styles/tailwind.css'
import './styles/globals.css'
import './styles/index.css'

// 2. Puxando o tema do Shadcn que está na raiz do projeto
import '../default_shadcn_theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)