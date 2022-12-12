import { createContext, useState, useEffect, useContext } from "react";
import { TweetListContext } from './TweetListContext';
import { addTweetToServer } from '../helpers/api';

const NewTweetContext = createContext();

function NewTweetContextProvider({ children }) {

    const [newTweet, setNewTweet] = useState();
    const { tweetList, setTweetList } = useContext(TweetListContext);

    const fetchToAPI = async () => {
        const results = await addTweetToServer(newTweet);

        if (results.success) {
            setTweetList([...tweetList, newTweet]);
        } else {
            alert(results.message)
        }
    }

    useEffect(() => {
        if (newTweet) {
            fetchToAPI();
        }
    }, [newTweet]);

    return (
        <NewTweetContext.Provider value={{ newTweet, setNewTweet }}>
            {children}
        </NewTweetContext.Provider>
    )
}

export { NewTweetContext, NewTweetContextProvider };