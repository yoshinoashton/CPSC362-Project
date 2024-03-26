import { createContext, useState, useEffect } from "react";
import { authenticate } from "../utils";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('');
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        const token = localStorage.getItem('token');
        setToken(token);
      }

      if (!username) {
        const username = localStorage.getItem('username');
        setUsername(username);
      }

      const auth = await(authenticate(token, username));
      setLogin(auth);
      return;
    }

    loadData();
  }, [token, username]);
  
  return (
    <UserContext.Provider value={{username, token, login, setUsername, setToken, setLogin}}>
      {children}
    </UserContext.Provider>
  )
}