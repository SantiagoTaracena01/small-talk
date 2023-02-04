import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/chat" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
  </Routes>
)

export default App
