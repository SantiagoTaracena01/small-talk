import React from 'react'
import LandingPage from './routes/LandingPage'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const App = () => <LandingPage />

export default App
