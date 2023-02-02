import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import MainPage from './routes/MainPage'

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/chat" element={<MainPage />} />
  </Routes>
)

export default App
