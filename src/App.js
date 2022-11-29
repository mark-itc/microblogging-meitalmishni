import { useState } from 'react';
import Blog from "./views/Blog"
import Login from "./views/Login"
import { Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';

function App() {
  const [username, setUsername] = useState();

  return (
    <div className="App">
      <Row className="justify-content-md-center navbar-row">
        <Col xs={9}>
          <Navbar className="navbar">
            <Container>
              <Nav className="me-auto">
                <Nav.Link href="/home" className="navbar-link">Home</Nav.Link>
                <Nav.Link href="/profile" className="navbar-link">Profile</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Col>
      </Row>

      <Routes>
        <Route path='/home' element={<Blog username={username} setUsername={setUsername} />} />
        <Route path='/' element={<Login username={username} setUsername={setUsername} />} />
        <Route path='/profile' element={<Login username={username} setUsername={setUsername} />} />
      </Routes>
    </div>
  );
}

export default App;
