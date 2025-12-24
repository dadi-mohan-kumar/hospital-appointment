import api from './api'

const patientService = {
  getAllPatients: async () => {
    const response = await api.get('/patients')
    return response.data
  },

  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`)
    return response.data
  },

  getPatientByUserId: async (userId) => {
    const response = await api.get(`/patients/user/${userId}`)
    return response.data
  },

  updatePatient: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData)
    return response.data
  },

  deletePatient: async (id) => {
    const response = await api.delete(`/patients/${id}`)
    return response.data
  },
}

export default patientService