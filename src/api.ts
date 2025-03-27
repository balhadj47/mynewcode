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
      data,
      validateStatus: () => true
    }

    console.log('Making API request to:', config.url)
    const response = await axios(config)
    
    console.log('Full API response:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      config: response.config
    })

    if (response.status >= 400) {
      const errorData = {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        request: {
          url: config.url,
          method: config.method,
          data: config.data
        }
      }
      console.error('API Error Details:', errorData)
      throw new Error(response.data?.message || `API request failed with status ${response.status}`)
    }

    return response.data
  } catch (error) {
    console.error('API Call Error:', {
      error,
      isAxiosError: axios.isAxiosError(error),
      response: axios.isAxiosError(error) ? error.response : null
    })
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 
        error.response?.statusText || 
        error.message)
    }
    throw error
  }
}

// Test function to verify API connection
export const testApiConnection = async () => {
  try {
    const response = await apiCall('/test', 'GET')
    return response
  } catch (error) {
    console.error('API Connection Test Failed:', error)
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
