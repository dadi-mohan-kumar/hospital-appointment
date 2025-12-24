import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import Header from '../common/Header'

const RoleSelection = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mb-5">Select Registration Type</h2>
        <Row className="justify-content-center g-4">
          <Col md={5}>
            <Card className="text-center h-100 shadow-sm hover-card">
              <Card.Body className="d-flex flex-column p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '4rem' }}>🏥</span>
                </div>
                <Card.Title className="mb-3">Register as Patient</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Book appointments with doctors and manage your medical records
                </Card.Text>
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-auto"
                  onClick={() => navigate('/register/patient')}
                >
                  Patient Registration
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={5}>
            <Card className="text-center h-100 shadow-sm hover-card">
              <Card.Body className="d-flex flex-column p-4">
                <div className="mb-3">
                  <span style={{ fontSize: '4rem' }}>👨‍⚕️</span>
                </div>
                <Card.Title className="mb-3">Register as Doctor</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Manage appointments and provide consultations to patients
                </Card.Text>
                <Button
                  variant="success"
                  size="lg"
                  className="mt-auto"
                  onClick={() => navigate('/register/doctor')}
                >
                  Doctor Registration
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <p>
            Already have an account?{' '}
            <Button variant="link" onClick={() => navigate('/login')}>
              Login here
            </Button>
          </p>
        </div>
      </Container>

      <style>{`
        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </>
  )
}

export default RoleSelection