import { createContext, useState, useEffect } from "react";
//import { getFromServer } from '../helpers/api';
import { collection, onSnapshot, getDocs, query, orderBy, limit, startAfter, endAt, limitToLast } from 'firebase/firestore';
import { db } from '../firebase'

const TweetListContext = createContext();
const tweetsCollectionRef = collection(db, "tweets");

function TweetListContextProvider({ children }) {
    const [tweetList, setTweetList] = useState([]);
    const [isTweetsLoaded, setIsTweetsLoaded] = useState(false);

    useEffect(() => {
        setIsTweetsLoaded(false);

        const q = query(tweetsCollectionRef, orderBy("date", "desc"), limit(3));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTweetList(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })

        setIsTweetsLoaded(true);

        return () => { unsubscribe() }
    }, []);

    return (
        <TweetListContext.Provider value={{ tweetList, setTweetList, isTweetsLoaded }}>
            {children}
        </TweetListContext.Provider>
    )
}

export { TweetListContext, TweetListContextProvider };