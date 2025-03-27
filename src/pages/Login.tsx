import React, { useState, useEffect } from 'react'
import { apiCall, testApiConnection } from '../api'

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [apiStatus, setApiStatus] = useState('')

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        await testApiConnection()
        setApiStatus('API connection successful')
      } catch (err) {
        setApiStatus(`API connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
      }
    }
    checkApiConnection()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('Attempting login with:', { username, password })
      const response = await apiCall('/login', 'POST', { username, password })
      console.log('Login response:', response)
      setAuthToken(response.token)
      setIsAuthenticated(true)
    } catch (err) {
      console.error('Login error details:', err)
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        {apiStatus && (
          <div className={`mb-4 ${apiStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {apiStatus}
          </div>
        )}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
