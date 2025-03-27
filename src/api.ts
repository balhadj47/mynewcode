import axios from 'axios'

const API_BASE_URL = '/api'

export const apiCall = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: any, token?: string) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      data
    }

    const response = await axios(config)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message)
    }
    throw error
  }
}

export const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token)
}

export const getAuthToken = () => {
  return localStorage.getItem('authToken')
}

export const removeAuthToken = () => {
  localStorage.removeItem('authToken')
}
