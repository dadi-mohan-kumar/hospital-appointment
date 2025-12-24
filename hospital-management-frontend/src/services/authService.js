import api from './api'

const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  // Register Patient
  registerPatient: async (userData) => {
    const response = await api.post('/auth/register/patient', userData)
    return response.data
  },

  // Register Doctor
  registerDoctor: async (userData) => {
    const response = await api.post('/auth/register/doctor', userData)
    return response.data
  },

  // Register Admin
  registerAdmin: async (userData) => {
    const response = await api.post('/auth/register/admin', userData)
    return response.data
  },
}

export default authService