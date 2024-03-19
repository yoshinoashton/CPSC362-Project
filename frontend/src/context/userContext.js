import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('');

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        const token = localStorage.getItem('token');
        setToken(token);
      }

      if (!username) {
        const username = localStorage.getItem('user');
        setUsername(username);
      }
      return;
    }

    authenticate();
  }, [token, username]);
  
  return (
    <UserContext.Provider value={{username, token, setUsername, setToken}}>
      {children}
    </UserContext.Provider>
  )
}