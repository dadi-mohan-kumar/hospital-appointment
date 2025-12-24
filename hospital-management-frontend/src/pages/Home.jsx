import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Card, Row, Col } from 'react-bootstrap'
import Header from '../components/common/Header'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (user?.role === 'ADMIN') navigate('/admin')
      else if (user?.role === 'DOCTOR') navigate('/doctor')
      else if (user?.role === 'PATIENT') navigate('/patient')
    } else {
      navigate('/register')
    }
  }

  return (
    <>
      <Header />
      <Container className="mt-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 mb-4">Welcome to Hospital Management System</h1>
          <p className="lead text-muted mb-4">
            Streamline your healthcare experience with our comprehensive management solution
          </p>
          <Button variant="primary" size="lg" onClick={handleGetStarted}>
            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </div>

        {/* Features Section */}
        <Row className="mt-5 g-4">
          <Col md={4}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>📅</span>
                </div>
                <Card.Title>Easy Appointments</Card.Title>
                <Card.Text className="text-muted">
                  Book and manage appointments with doctors seamlessly
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>👨‍⚕️</span>
                </div>
                <Card.Title>Expert Doctors</Card.Title>
                <Card.Text className="text-muted">
                  Access to qualified doctors across various specializations
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="text-center h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '3rem' }}>📊</span>
                </div>
                <Card.Title>Complete Records</Card.Title>
                <Card.Text className="text-muted">
                  Maintain and access your medical records anytime
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        {!isAuthenticated && (
          <div className="text-center mt-5 p-5 bg-light rounded">
            <h3 className="mb-3">Ready to get started?</h3>
            <p className="text-muted mb-4">Join thousands of patients and healthcare providers</p>
            <Button variant="primary" size="lg" className="me-3" onClick={() => navigate('/register')}>
              Register Now
            </Button>
            <Button variant="outline-primary" size="lg" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        )}
      </Container>
    </>
  )
}

export default Home