import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import { useAuth } from './auth';
import '../../styles/Headbar.css'

function HeaderBar() {
  const { isAuthenticated, logout } = useAuth(); // Use the authentication context
  const logoutManage = ()=>{
    logout();
    window.location.href = '/'
  }
  return (
    <Navbar bg='dark' expand="lg" data-bs-theme="dark" sticky='top' >
      <Container>
        <Navbar.Brand as={Link} to="/">Shopping App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
            <NavDropdown title="Collections" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                Shirts
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">T-Shirts</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Nav className="justify-content-end">
          {isAuthenticated ? (
            <>
              <Nav.Link as={Link} to='/user/profile'>Profile Page</Nav.Link>
              <Nav.Link as={Link} to='/cart'>Cart Page</Nav.Link>
              <Nav.Link onClick={logoutManage}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              <Nav.Link as={Link} to='/registration'>Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default HeaderBar;
