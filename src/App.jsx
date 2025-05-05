import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import LoginForm from './components/Forms/LoginForm'
import RegisterForm from './components/Forms/RegisterForm'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ token })
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm onRegister={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/header" element={<Header user={user} />} />
        <Route path="*" element={<Navigate to="/header" replace />} />
      </Routes>
    </Router>
  )
}

export default App
