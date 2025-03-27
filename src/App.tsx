import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { apiCall } from './api'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Users from './pages/Users'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      await apiCall('/verify', 'GET', undefined, token)
      setIsAuthenticated(true)
    } catch (error) {
      localStorage.removeItem('authToken')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
