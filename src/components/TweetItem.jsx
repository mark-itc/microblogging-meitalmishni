import Card from 'react-bootstrap/Card';
import "./TweetItem.css";

function TweetItem(props) {

    const { username, date, text } = props;

    return (
        <>
            <Card className="tweet-card">
                <Card.Body>
                    <div className="tweet-details">
                        <p className="tweet-username">{username}</p>
                        <p className="tweet-date">{date}</p>
                    </div>

                    <div className="tweet-text">
                        {text}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default TweetItem;