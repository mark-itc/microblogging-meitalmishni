import { createContext, useState, useEffect, useContext } from "react";
import { TweetListContext } from './TweetListContext';
import { addTweetToServer } from '../helpers/api';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const NewTweetContext = createContext();

function NewTweetContextProvider({ children }) {

    const tweetsCollectionRef = collection(db, "tweets");
    const [newTweet, setNewTweet] = useState();

    const addNewTweet = async () => {
        try {
            const response = await addDoc(tweetsCollectionRef, newTweet);
        }
        catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        if (newTweet) {
            addNewTweet();
        }
    }, [newTweet]);

    return (
        <NewTweetContext.Provider value={{ newTweet, setNewTweet }}>
            {children}
        </NewTweetContext.Provider>
    )
}

export { NewTweetContext, NewTweetContextProvider };