import axios from 'axios'

const API_BASE_URL = 'https://asdar.net:8443/webhook/571a7163-772a-4090-bf39-5d172e441ebe'

interface ApiResponse {
  success: boolean
  token?: string
  users?: any[]
  products?: any[]
  numbers?: any[]
  error?: string
  code?: number
}

export const apiCall = async (action: string, data: any = {}, token?: string): Promise<ApiResponse> => {
  try {
    const config = {
      method: 'POST',
      url: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { token })
      },
      data: {
        action,
        ...data
      },
      validateStatus: () => true
    }

    console.log('API Request:', config)
    const response = await axios(config)
    
    console.log('API Response:', response.data)

    if (response.data?.success === false) {
      throw new Error(response.data.error || `API request failed with status ${response.status}`)
    }

    return response.data
  } catch (error) {
    console.error('API Error:', error)
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 
        error.response?.statusText || 
        error.message)
    }
    throw error
  }
}

export const login = async (username: string, password: string) => {
  return apiCall('login', { user: username, pass: password })
}

export const getUsers = async (token: string) => {
  return apiCall('get_users', {}, token)
}

export const getProducts = async (token: string) => {
  return apiCall('get_products', {}, token)
}

export const addProduct = async (
  token: string,
  productData: {
    product_name: string
    amount: number
    price: number
    serial_number: string
  }
) => {
  return apiCall('add_product', productData, token)
}

export const deleteProduct = async (token: string, product_name: string) => {
  return apiCall('delete_product', { product_name }, token)
}

export const getNumbers = async (token: string) => {
  return apiCall('get_numbers', {}, token)
}

export const addNumber = async (token: string, phone_number: string) => {
  return apiCall('add_number', { phone_number }, token)
}

export const deleteNumber = async (token: string, phone_number: string) => {
  return apiCall('delete_number', { phone_number }, token)
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
