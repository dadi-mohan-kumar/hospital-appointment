import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap'
import Header from '../common/Header'
import NavigationBar from '../common/Navbar'
import Loading from '../common/Loading'
import { useAuth } from '../../context/AuthContext'
import doctorService from '../../services/doctorService'
import appointmentService from '../../services/appointmentService'

const DoctorDashboard = () => {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="mb-4">Doctor Dashboard</h2>
        <NavigationBar
          links={[
            { path: '/doctor', label: 'Overview' },
            { path: '/doctor/appointments', label: 'My Appointments' },
            { path: '/doctor/profile', label: 'My Profile' },
          ]}
        />
        <Routes>
          <Route path="/" element={<DoctorOverview />} />
          <Route path="/appointments" element={<DoctorAppointments />} />
          <Route path="/profile" element={<DoctorProfile />} />
        </Routes>
      </Container>
    </>
  )
}

// Doctor Overview Component
const DoctorOverview = () => {
  const { user } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctorData()
  }, [])

  const fetchDoctorData = async () => {
    try {
      const doctorData = await doctorService.getDoctorByUserId(user.userId)
      setDoctor(doctorData)

      const appointmentsData = await appointmentService.getAppointmentsByDoctorId(doctorData.id)
      setAppointments(appointmentsData)
    } catch (error) {
      console.error('Error fetching doctor data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  const todayAppointments = appointments.filter(
    (apt) => apt.appointmentDate === new Date().toISOString().split('T')[0]
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
              <h3 className="text-success">{todayAppointments.length}</h3>
              <p className="text-muted mb-0">Today's Appointments</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <h3 className="text-info">{doctor?.specialization}</h3>
              <p className="text-muted mb-0">Specialization</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <h4 className="mb-4">Recent Appointments</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patient?.user?.name}</td>
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
        </Card.Body>
      </Card>
    </>
  )
}

// Doctor Appointments Component
const DoctorAppointments = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const doctorData = await doctorService.getDoctorByUserId(user.userId)
      const data = await appointmentService.getAppointmentsByDoctorId(doctorData.id)
      setAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await appointmentService.updateAppointmentStatus(id, status)
      alert('Status updated successfully')
      fetchAppointments()
    } catch (error) {
      alert('Error updating status')
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">All My Appointments</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
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
                <td>{appointment.patient?.user?.name}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.symptoms || 'N/A'}</td>
                <td>
                  <Badge bg={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </td>
                <td>
                  {appointment.status === 'SCHEDULED' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleStatusUpdate(appointment.id, 'CONFIRMED')}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  {appointment.status === 'CONFIRMED' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                    >
                      Complete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

// Doctor Profile Component
const DoctorProfile = () => {
  const { user } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const data = await doctorService.getDoctorByUserId(user.userId)
      setDoctor(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">My Profile</h4>
        <Row>
          <Col md={6}>
            <p><strong>Name:</strong> {doctor?.user?.name}</p>
            <p><strong>Email:</strong> {doctor?.user?.email}</p>
            <p><strong>Phone:</strong> {doctor?.user?.phone}</p>
          </Col>
          <Col md={6}>
            <p><strong>Specialization:</strong> {doctor?.specialization}</p>
            <p><strong>Qualification:</strong> {doctor?.qualification}</p>
            <p><strong>Experience:</strong> {doctor?.experience} years</p>
            <p><strong>Available Slots:</strong> {doctor?.availableSlots}</p>
          </Col>
        </Row>
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

export default DoctorDashboard