import api from './api'

const doctorService = {
  getAllDoctors: async () => {
    const response = await api.get('/doctors')
    return response.data
  },

  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`)
    return response.data
  },

  getDoctorByUserId: async (userId) => {
    const response = await api.get(`/doctors/user/${userId}`)
    return response.data
  },

  getDoctorsBySpecialization: async (specialization) => {
    const response = await api.get(`/doctors/specialization/${specialization}`)
    return response.data
  },

  updateDoctor: async (id, doctorData) => {
    const response = await api.put(`/doctors/${id}`, doctorData)
    return response.data
  },

  deleteDoctor: async (id) => {
    const response = await api.delete(`/doctors/${id}`)
    return response.data
  },
}

export default doctorService