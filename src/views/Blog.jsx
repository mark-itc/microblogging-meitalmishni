import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./Blog.css";
import { useState, useEffect } from 'react';
import TweetItem from '../components/TweetItem';

function Blog() {
    const [input, setInput] = useState();
    const [tweetList, setTweetList] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [tweetDetails, setTweetDetails] = useState(false)

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

        const now = new Date().toISOString();

        const tweet = {
            content: input,
            userName: "Username",
            date: now,
        }

        setInput('');

        setDisabled(true);
        addTweetToServer(tweet);
        setDisabled(false);
    }

    const addTweetToServer = async (tweet) => {
        try {
            const response = await fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet', {
                method: 'POST',
                body: JSON.stringify(tweet),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error("Can't add new tweet to server");
            }

            setTweetList([...tweetList, tweet]);

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getFromServer();
    }, []);

    const getFromServer = async () => {
        try {
            const response = await fetch("https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet");

            if (!response.ok) {
                throw Error("Oops..something went wrong");
            }

            const results = await response.json();

            const filteredTweets = (results.tweets).filter(tweet => {
                return tweet.userName === 'Username';
            });

            setTweetList(filteredTweets);
            setTweetDetails(true);

        } catch (error) {
            alert(error);
        }
    }

    const sortTweets = () => {
        tweetList.sort((tweetA, tweetB) => (tweetA.date < tweetB.date) ? 1 : -1);
    }

    const renderTweetList = () => {
        sortTweets();

        return tweetList.map((tweet, index) => {
            return (<TweetItem
                key={`tweet-item-${index}`}
                username={tweet.userName}
                date={tweet.date}
                text={tweet.content} />)
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
                            tweetDetails ?
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