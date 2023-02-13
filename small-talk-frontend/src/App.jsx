import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import ProfilePage from './routes/ProfilePage'
import ChartPage from './routes/ChartPage'

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/chat" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/charts" element={<ChartPage />} />
  </Routes>
)

export default App
