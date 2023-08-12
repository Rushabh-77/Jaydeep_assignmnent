import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function HeaderBar() {
  return (
    <Navbar bg='dark' expand="lg" data-bs-theme="dark" sticky='top' >
      <Container>
        <Navbar.Brand href="/">Shopping App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
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