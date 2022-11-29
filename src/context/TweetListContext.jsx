import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from './UserContext';

const TweetListContext = createContext();

function TweetListContextProvider({ children }) {

    const [tweetList, setTweetList] = useState([]);
    const [tweetDetails, setTweetDetails] = useState(false);
    const { username } = useContext(UserContext);

    const getFromServer = async () => {
        try {
            const response = await fetch("https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet");

            if (!response.ok) {
                throw Error("Oops..something went wrong");
            }

            const results = await response.json();

            const filteredTweets = (results.tweets).filter(tweet => {
                return tweet.userName === username;
            });

            setTweetDetails(true);
            setTweetList(filteredTweets);

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getFromServer();
    }, []);

    useEffect(() => {
        getFromServer();

    }, [username]);


    return (
        <TweetListContext.Provider value={{ tweetList, setTweetList, tweetDetails, setTweetDetails }}>
            {children}
        </TweetListContext.Provider>
    )
}

export { TweetListContext, TweetListContextProvider };