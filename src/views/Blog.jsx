import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useContext } from 'react';
import TweetItem from '../components/TweetItem';
import { TweetListContext } from '../context/TweetListContext';
import { UserContext } from '../context/UserContext';
import { NewTweetContext } from '../context/NewTweetContext';
import "./Blog.css";

function Blog() {
    const { user } = useContext(UserContext);
    const { tweetList, isTweetsLoaded } = useContext(TweetListContext);
    const { setNewTweet } = useContext(NewTweetContext);

    const [input, setInput] = useState();
    const [disabled, setDisabled] = useState(false);
    const [uid, setUid] = useState('');

    const fetchUserInfo = async () => {
        const { uid } = user;
        setUid(uid);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const onInputChangeMethod = (eventArgs) => {
        const currentInput = eventArgs.target.value;

        if (currentInput.length > 140) {
            setDisabled(true);
            return false;
        }

        setDisabled(false);
        setInput(currentInput);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const now = new Date();
        const tweet = {
            content: input,
            userName: uid,
            date: now,
        }

        setInput('');
        setDisabled(true);
        setNewTweet(tweet);
        setDisabled(false);
    }

    useEffect(() => {
        renderTweetList();
    }, [tweetList]);

    const convertDate = (time) => {
        let fireBaseTime = time * 1000;
        let date = new Date(fireBaseTime)
        let dateFormat = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
        return dateFormat;
    }

    const renderTweetList = () => {
        return tweetList.map((tweet) => {
            const date = convertDate(tweet.data.date.seconds);

            return (<TweetItem
                key={tweet.id}
                username={tweet.data.userName}
                date={date}
                text={tweet.data.content} />)
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={6}>
                    <Form onSubmit={submitHandler}>
                        <Card className="custom-card">
                            <Card.Body className="custom-card-body">
                                <Form.Control
                                    className="custom-textarea"
                                    as="textarea"
                                    placeholder="What you have in mind..."
                                    onChange={onInputChangeMethod}
                                    value={input}
                                />
                            </Card.Body>

                            <div className="flex-content">
                                {disabled ?
                                    <div className="error">
                                        <p>The tweet can't contain more then 140 chars.</p>
                                    </div> : null
                                }

                                <Button variant="primary" className="mb-2 custom-button" type="submit" disabled={disabled}>Tweet</Button>
                            </div>
                        </Card>
                    </Form>

                    <div>
                        {
                            isTweetsLoaded ?
                                (
                                    tweetList.length > 0 ? renderTweetList() : null
                                )
                                : (<h5 className="white-text">Loading...</h5>)
                        }
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default Blog;