import { useContext } from "react";
// import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import PetProfilePage from "../views/PetProfilePage";

// Bring in bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Navigation = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Session Auth</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {user ? (
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/petprofile">PetProfilePage</Nav.Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
  );
};

export default Navigation;