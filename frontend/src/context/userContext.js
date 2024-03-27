import { createContext, useState, useEffect } from "react";
import { authenticate } from "../utils";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('');
  const [login, setLogin] = useState(false);
  const [balance, setBalance] = useState(0.00);

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

      if (!balance) {
        const balance = Number(localStorage.getItem('balance'));
        setBalance(balance)
      }

      const auth = await(authenticate(token, username));
      setLogin(auth);
      return;
    }

    loadData();
  }, [token, username, balance]);
  
  return (
    <UserContext.Provider value={{username, token, login, balance, setUsername, setToken, setLogin, setBalance}}>
      {children}
    </UserContext.Provider>
  )
}