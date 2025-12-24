import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap'
import Header from '../common/Header'
import NavigationBar from '../common/Navbar'
import Loading from '../common/Loading'
import adminService from '../../services/adminService'
import userService from '../../services/userService'
import doctorService from '../../services/doctorService'
import patientService from '../../services/patientService'

const AdminDashboard = () => {
  return (
    <>
      <Header />
      <Container className="mt-4">
        <h2 className="mb-4">Admin Dashboard</h2>
        <NavigationBar
          links={[
            { path: '/admin', label: 'Overview' },
            { path: '/admin/users', label: 'Manage Users' },
            { path: '/admin/doctors', label: 'Manage Doctors' },
            { path: '/admin/patients', label: 'Manage Patients' },
          ]}
        />
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/doctors" element={<ManageDoctors />} />
          <Route path="/patients" element={<ManagePatients />} />
        </Routes>
      </Container>
    </>
  )
}

// Admin Overview Component
const AdminOverview = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const data = await adminService.getDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <Row className="g-4">
      <Col md={3}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <h3 className="text-primary">{stats?.totalUsers || 0}</h3>
            <p className="text-muted mb-0">Total Users</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <h3 className="text-success">{stats?.totalDoctors || 0}</h3>
            <p className="text-muted mb-0">Total Doctors</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <h3 className="text-info">{stats?.totalPatients || 0}</h3>
            <p className="text-muted mb-0">Total Patients</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center shadow-sm">
          <Card.Body>
            <h3 className="text-warning">{stats?.totalAppointments || 0}</h3>
            <p className="text-muted mb-0">Total Appointments</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

// Manage Users Component
const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id)
        alert('User deleted successfully')
        fetchUsers()
      } catch (error) {
        alert('Error deleting user')
      }
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">All Users</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span className={`badge bg-${user.role === 'ADMIN' ? 'danger' : user.role === 'DOCTOR' ? 'success' : 'primary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

// Manage Doctors Component
const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const data = await doctorService.getAllDoctors()
      setDoctors(data)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorService.deleteDoctor(id)
        alert('Doctor deleted successfully')
        fetchDoctors()
      } catch (error) {
        alert('Error deleting doctor')
      }
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">All Doctors</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.user?.name}</td>
                <td>{doctor.user?.email}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.experience} years</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

// Manage Patients Component
const ManagePatients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const data = await patientService.getAllPatients()
      setPatients(data)
    } catch (error) {
      console.error('Error fetching patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientService.deletePatient(id)
        alert('Patient deleted successfully')
        fetchPatients()
      } catch (error) {
        alert('Error deleting patient')
      }
    }
  }

  if (loading) return <Loading />

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">All Patients</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Blood Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.user?.name}</td>
                <td>{patient.user?.email}</td>
                <td>{patient.user?.phone}</td>
                <td>{patient.age || 'N/A'}</td>
                <td>{patient.gender || 'N/A'}</td>
                <td>{patient.bloodGroup || 'N/A'}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(patient.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default AdminDashboard