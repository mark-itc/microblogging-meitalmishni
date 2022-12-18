import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Register() {
    const { signUp } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const register = async (e) => {
        try {
            e.preventDefault();

            const user = await signUp(email, password);
            navigate('/home');

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Container className="login-form">
            <Row className="justify-content-md-center">
                <Col xs={6} className="col-form">
                    <h1>Register</h1>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email.."
                                className="username-text"
                                defaultValue={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password.."
                                className="username-text"
                                defaultValue={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                        </Form.Group>

                        <Button variant="primary"
                            type="submit"
                            className="custom-login-button"
                            onClick={register}>

                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register