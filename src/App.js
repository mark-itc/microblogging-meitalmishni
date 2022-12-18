import Blog from "./views/Blog"
import Login from "./views/Login"
import Register from "./views/Register"
import { Routes, Route, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { UserContext } from './context/UserContext';
import ProtectedRoute from './helpers/protectedRoute';
import './App.css';

function App() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');

    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="App">
      {user ?
        <Row className="justify-content-md-center navbar-row">
          <Col xs={9}>
            <Navbar className="navbar">
              <Container>
                <Nav className="me-auto">
                  <Nav.Link href="/home" className="navbar-link">Home</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Button onClick={handleLogout} variant="secondary" size="sm">Logout</Button>
                </Form>
              </Container>
            </Navbar>
          </Col>
        </Row>
        :
        <Row className="justify-content-md-center navbar-row">
          <Col xs={9}>
            <Navbar className="navbar">
              <Container>
                <Nav className="me-auto">
                  <Nav.Link href="/login" className="navbar-link">Login</Nav.Link>
                  <Nav.Link href="/register" className="navbar-link">Register</Nav.Link>
                </Nav>
              </Container>
            </Navbar>
          </Col>
        </Row>
      }


      <Routes>
        <Route path='/home' element={<ProtectedRoute><Blog /></ProtectedRoute>} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
