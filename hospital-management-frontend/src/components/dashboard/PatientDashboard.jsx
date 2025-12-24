import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from 'react-bootstrap'
import Header from '../common/Header'
import NavigationBar from '../common/Navbar'
import Loading from '../common/Loading'
import { useAuth } from '../../context/AuthContext'
import patientService from '../../services/patientService'
import appointmentService from '../../services/appointmentService'
import doctorService from '../../services/doctorService'

const PatientDashboard = () => {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="mb-4">Patient Dashboard</h2>
        <NavigationBar
          links={[
            { path: '/patient', label: 'Overview' },
            { path: '/patient/appointments', label: 'My Appointments' },
            { path: '/patient/book-appointment', label: 'Book Appointment' },
            { path: '/patient/profile', label: 'My Profile' },
          ]}
        />
        <Routes>
          <Route path="/" element={<PatientOverview />} />
          <Route path="/appointments" element={<PatientAppointments />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/profile" element={<PatientProfile />} />
        </Routes>
      </Container>
    </>
  )
}

// Patient Overview Component
const PatientOverview = () => {
  const { user } = useAuth()
  const [patient, setPatient] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatientData()
  }, [])

  const fetchPatientData = async () => {
    try {
      const patientData = await patientService.getPatientByUserId(user.userId)
      setPatient(patientData)

      const appointmentsData = await appointmentService.getAppointmentsByPatientId(patientData.id)
      setAppointments(appointmentsData)
    } catch (error) {
      console.error('Error fetching patient data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED'
  )

  return (
    <>
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3 className="text-primary">{appointments.length}</h3>
              <p className="text-muted mb-0">Total Appointments</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3 className="text-success">{upcomingAppointments.length}</h3>
              <p className="text-muted mb-0">Upcoming Appointments</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3 className="text-info">
                {appointments.filter((a) => a.status === 'COMPLETED').length}
              </h3>
              <p className="text-muted mb-0">Completed Appointments</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-4">Recent Appointments</h4>
          {appointments.length === 0 ? (
            <p className="text-muted text-center">No appointments found</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.doctor?.user?.name}</td>
                    <td>{appointment.doctor?.specialization}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
                    <td>
                      <Badge bg={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

// Patient Appointments Component
const PatientAppointments = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const patientData = await patientService.getPatientByUserId(user.userId)
      const data = await appointmentService.getAppointmentsByPatientId(patientData.id)
      setAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentService.updateAppointmentStatus(id, 'CANCELLED')
        alert('Appointment cancelled successfully')
        fetchAppointments()
      } catch (error) {
        alert('Error cancelling appointment')
      }
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">All My Appointments</h4>
        {appointments.length === 0 ? (
          <p className="text-muted text-center">No appointments found</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Time</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.doctor?.user?.name}</td>
                  <td>{appointment.doctor?.specialization}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.symptoms || 'N/A'}</td>
                  <td>
                    <Badge bg={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </td>
                  <td>
                    {(appointment.status === 'SCHEDULED' || appointment.status === 'CONFIRMED') && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  )
}

// Book Appointment Component
const BookAppointment = () => {
  const { user } = useAuth()
  const [doctors, setDoctors] = useState([])
  const [patient, setPatient] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const doctorsData = await doctorService.getAllDoctors()
      setDoctors(doctorsData)

      const patientData = await patientService.getPatientByUserId(user.userId)
      setPatient(patientData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const appointmentData = {
        patient: { id: patient.id },
        doctor: { id: parseInt(selectedDoctor) },
        appointmentDate,
        appointmentTime,
        symptoms,
        status: 'SCHEDULED',
      }

      await appointmentService.createAppointment(appointmentData)
      alert('Appointment booked successfully!')
      
      // Reset form
      setSelectedDoctor('')
      setAppointmentDate('')
      setAppointmentTime('')
      setSymptoms('')
    } catch (error) {
      alert('Error booking appointment. Please try again.')
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">Book New Appointment</h4>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Doctor *</Form.Label>
                <Form.Select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  <option value="">Choose a doctor...</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.user?.name} - {doctor.specialization}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Appointment Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Appointment Time *</Form.Label>
                <Form.Control
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Symptoms</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe your symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Booking...
              </>
            ) : (
              'Book Appointment'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

// Patient Profile Component
const PatientProfile = () => {
  const { user } = useAuth()
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    address: '',
    bloodGroup: '',
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await patientService.getPatientByUserId(user.userId)
      setPatient(data)
      setFormData({
        age: data.age || '',
        gender: data.gender || '',
        address: data.address || '',
        bloodGroup: data.bloodGroup || '',
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await patientService.updatePatient(patient.id, formData)
      alert('Profile updated successfully!')
      setEditing(false)
      fetchProfile()
    } catch (error) {
      alert('Error updating profile')
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>My Profile</h4>
          {!editing && (
            <Button variant="primary" onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        {editing ? (
          <Form onSubmit={handleUpdate}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={patient?.user?.name} disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={patient?.user?.email} disabled />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" value={patient?.user?.phone} disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="me-2">
              Save Changes
            </Button>
            <Button variant="secondary" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Form>
        ) : (
          <Row>
            <Col md={6}>
              <p><strong>Name:</strong> {patient?.user?.name}</p>
              <p><strong>Email:</strong> {patient?.user?.email}</p>
              <p><strong>Phone:</strong> {patient?.user?.phone}</p>
            </Col>
            <Col md={6}>
              <p><strong>Age:</strong> {patient?.age || 'Not provided'}</p>
              <p><strong>Gender:</strong> {patient?.gender || 'Not provided'}</p>
              <p><strong>Blood Group:</strong> {patient?.bloodGroup || 'Not provided'}</p>
              <p><strong>Address:</strong> {patient?.address || 'Not provided'}</p>
            </Col>
          </Row>
        )}
      </Card.Body>
    </Card>
  )
}

// Helper function for status colors
const getStatusColor = (status) => {
  switch (status) {
    case 'SCHEDULED':
      return 'warning'
    case 'CONFIRMED':
      return 'info'
    case 'COMPLETED':
      return 'success'
    case 'CANCELLED':
      return 'danger'
    default:
      return 'secondary'
  }
}

export default PatientDashboard