import api from './api'

const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await api.get('/users')
    return response.data
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },

  // Get user by email
  getUserByEmail: async (email) => {
    const response = await api.get(`/users/email/${email}`)
    return response.data
  },

  // Get users by role
  getUsersByRole: async (role) => {
    const response = await api.get(`/users/role/${role}`)
    return response.data
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },
}

export default userService