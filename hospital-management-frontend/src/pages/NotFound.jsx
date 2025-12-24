import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import Header from '../components/common/Header'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container className="text-center mt-5">
        <div style={{ fontSize: '8rem' }}>404</div>
        <h1 className="mb-4">Page Not Found</h1>
        <p className="text-muted mb-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Go to Home
        </Button>
      </Container>
    </>
  )
}

export default NotFound