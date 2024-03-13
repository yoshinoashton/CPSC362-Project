import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react';

import Footer from "../components/Footer";
import { UserContext } from '../context/userContext';


export default function LoginPage() {
  const context = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');


  // check if user is logged in


  // on submit button click
  const handleLogin = (async (e) => {

    e.preventDefault();
    console.log(username, password);

    const data = {
      "username": username,
      "password": password
    }

    const response = await fetch('/api/account/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return;
    } else {
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        context.setToken(data.token);
        context.setUser(data.user);
        setResponse(data);
      } else {
        setResponse(data);
      }
    }
  });

  return (  
    <>
    <div className="login-page">
      <form className='login-form' onSubmit={handleLogin}>
        <h1>PalTrade Hub</h1>
        <div className='login-container'>
          <input type='text' id='username' name='username' placeholder='Email or Username'
                 onChange={(e) => { setUsername(e.target.value)}}/>
          <br/><br/>
          <input type='text' id='password' name='password' placeholder='Password'
                 onChange={(e) => { setPassword(e.target.value)}}/>
          <br/><br/>
          <button type='submit'>Login</button>
        </div>
        {!response.success && (
          <p>{response.message}</p>
        )}
        {response.success && (
          <Navigate to="/" replace={true} />
        )}
        <p>OR</p>
        <Link to='/signup'>Sign Up</Link>
      </form>
    </div>
    <Footer />
    </>
  );
}