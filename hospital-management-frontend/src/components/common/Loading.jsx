import React from 'react'
import { Spinner, Container } from 'react-bootstrap'

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Container className="text-center mt-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="mt-3">{message}</p>
    </Container>
  )
}

export default Loading