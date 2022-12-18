import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useCallback } from "react";
import { UserContext } from '../context/UserContext';
import { GoogleButton } from 'react-google-button'
import "./Login.css";
import { useEffect } from 'react';

function Login() {
    const { user, signIn, googleSignIn } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();

        try {
            const user = await signIn(email, password);

        } catch (error) {
            alert(error.message);
        }
    }

    const googleLogin = async () => {
        try {
            const user = await googleSignIn();
            navigate('/home');

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user]);

    return (
        <>
            <Container className="login-form">
                <Row className="justify-content-md-center">
                    <Col xs={6} className="col-form">
                        <h1>Login</h1>
                        <Form>
                            <div className="custom-google-button">
                                <GoogleButton onClick={googleLogin} />
                            </div>

                            <div className="select-option"><span>Or</span></div>

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

                            <Button
                                variant="primary"
                                type="submit"
                                className="custom-login-button"
                                onClick={login}>

                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;