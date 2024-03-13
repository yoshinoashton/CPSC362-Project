import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    const authenticate = async () => {
      if (!token) {
        const token = localStorage.getItem('token');
        setToken(token);
      }

      const response = await fetch('/api/account/auth', {
        headers: {
          'authorization': token
        }
      });
    
      if (!response.ok) {
        const message = `Error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
    
      const user = await response.json();
      if (!user) {
        window.alert('Error: Unable to load user JSON data');
        return;
      }
      
      setUser(user);
      return;
    }

    authenticate();
  }, [token]);
  
  return (
    <UserContext.Provider value={{user, token, setUser, setToken}}>
      {children}
    </UserContext.Provider>
  )
}