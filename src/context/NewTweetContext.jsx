import { createContext, useState, useEffect, useContext } from "react";
import { TweetListContext } from './TweetListContext';

const NewTweetContext = createContext();

function NewTweetContextProvider({ children }) {

    const [newTweet, setNewTweet] = useState();
    const { tweetList, setTweetList } = useContext(TweetListContext);

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

            setTweetList([...tweetList, newTweet]);

        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        if (newTweet) {
            addTweetToServer(newTweet);
        }

    }, [newTweet]);

    return (
        <NewTweetContext.Provider value={{ newTweet, setNewTweet }}>
            {children}
        </NewTweetContext.Provider>
    )
}

export { NewTweetContext, NewTweetContextProvider };