import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply stored theme before React renders to avoid flash
const stored = localStorage.getItem('portfolio-theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = stored ?? (prefersDark ? 'dark' : 'light')
document.documentElement.classList.toggle('dark', theme === 'dark')
document.documentElement.classList.toggle('light', theme === 'light')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
