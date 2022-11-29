import { createContext, useState, useEffect } from "react";
import localForage from "localforage";

const UserContext = createContext();

function UserContextProvider({ children }) {

    const [username, setUsername] = useState();

    async function getFromForage() {
        const user = await localForage.getItem('username');
        if (user) {
            setUsername(user);
        }
    }

    useEffect(() => {
        getFromForage();
    }, []);

    useEffect(() => {
        localForage.setItem('username', username);

    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };