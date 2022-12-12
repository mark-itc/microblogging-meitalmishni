import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from '../context/UserContext';
import "./Login.css";

function Login() {
    const { username, setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const showTweetsPage = () => {
        navigate('/home');
    }

    return (
        <Container className="login-form">
            <Row className="justify-content-md-center">
                <Col xs={6} className="col-form">
                    <h1>Profile</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text"
                                placeholder="Username"
                                className="username-text"
                                defaultValue={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }} />
                        </Form.Group>
                        <Button variant="primary"
                            type="submit"
                            className="custom-login-button"
                            onClick={() => { showTweetsPage() }}>

                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;