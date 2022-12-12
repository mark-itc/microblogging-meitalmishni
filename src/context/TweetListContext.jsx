import { createContext, useState, useEffect } from "react";
import { getFromServer } from '../helpers/api';

const TweetListContext = createContext();

function TweetListContextProvider({ children }) {
    const [tweetList, setTweetList] = useState([]);
    const [isTweetsLoaded, setIsTweetsLoaded] = useState(false);

    const fetchFromAPI = async () => {
        const results = await getFromServer();

        if (results.success) {
            setTweetList(results.data.tweets);
            setIsTweetsLoaded(true);
        } else {
            alert(results.data)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTweetsLoaded(false);
            fetchFromAPI();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <TweetListContext.Provider value={{ tweetList, setTweetList, isTweetsLoaded }}>
            {children}
        </TweetListContext.Provider>
    )
}

export { TweetListContext, TweetListContextProvider };