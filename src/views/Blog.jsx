import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import "./Blog.css";
import { useState, useEffect } from 'react';
import localForage from "localforage";
import TweetItem from '../components/TweetItem';


function Blog() {
    const [input, setInput] = useState();
    const [tweetList, setTweetList] = useState([]);
    const [disabled, setDisabled] = useState(false);

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
            username: "Username",
            date: now,
            text: input,
        }

        setTweetList([...tweetList, tweet]);
        setInput('');
    }

    async function getFromForage() {
        const savedItems = await localForage.getItem('tweets-list');

        if (savedItems) {
            setTweetList(JSON.parse(savedItems))
        }
    }

    useEffect(() => {
        if (tweetList.length > 0) {
            localForage.setItem('tweets-list', JSON.stringify(tweetList));
        }

    }, [tweetList]);

    useEffect(() => {
        getFromForage()
    }, []);

    const renderTweetList = () => {

        tweetList.sort((tweetA, tweetB) => (tweetA.date < tweetB.date) ? 1 : -1);

        return tweetList.map((tweet, index) => {
            return (<TweetItem
                key={`tweet-item-${index}`}
                username={tweet.username}
                date={tweet.date}
                text={tweet.text} />)
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

                            <div style={{ display: 'flex' }}>
                                {disabled ?
                                    <div className="error">
                                        <p>The tweet can't contain more then 140 chars.</p>
                                    </div> : null
                                }

                                <Button variant="primary" className="mb-2 custom-button" type="submit" disabled={disabled}>Tweet</Button>
                            </div>
                        </Card>
                    </Form>

                    <div className='search-results'>
                        {
                            tweetList.length > 0 ? renderTweetList() : <div style={{ color: 'white' }}>No tweets</div>
                        }
                    </div>

                </Col>
            </Row>
        </Container >
    );
}

export default Blog;