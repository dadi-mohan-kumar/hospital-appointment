import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const NavigationBar = ({ links }) => {
  const location = useLocation()

  return (
    <Nav variant="pills" className="mb-4">
      {links.map((link) => (
        <Nav.Item key={link.path}>
          <Nav.Link
            as={Link}
            to={link.path}
            active={location.pathname === link.path}
          >
            {link.label}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default NavigationBar