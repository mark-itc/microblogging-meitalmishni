import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import localForage from "localforage";
import { useState, useEffect } from "react";

function Login() {
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    async function getFromForage() {
        const user = await localForage.getItem('username');
        if (user) {
            setUsername(user);
        }
    }

    useEffect(() => {
        getFromForage();

    }, [])

    const showTweetsPage = () => {
        localForage.setItem('username', username);

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