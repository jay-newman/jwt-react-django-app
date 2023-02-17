import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ProtectedPage from "../views/ProtectedPage";

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
              <Nav.Link href="/protected">ProtectedPage</Nav.Link>
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




{/* <nav>
<div>
  <h1>JWT-React-Django App</h1>
  <div>
    {user ? (
      <>
        <Link to="/">Home</Link>
        <Link to="/protected">ProtectedPage</Link>
        <button onClick={logoutUser}>Logout</button>
      </>
    ) : (
      <>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </>
    )}
  </div>
</div>
</nav> */}