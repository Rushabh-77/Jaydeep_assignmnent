import { Container, Nav, NavDropdown, NavItem, NavLink, Navbar } from 'react-bootstrap';

function HeaderBar() {
  return (
    <Navbar bg='dark' expand="lg" data-bs-theme="dark" sticky='top' >
      <Container>
        <Navbar.Brand href="#home">Shopping App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <NavDropdown title="Collections" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                Shirts
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">T-Shirts</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {/* <Navbar.Toggle /> */}
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link>logout</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default HeaderBar;