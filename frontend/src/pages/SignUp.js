import { Link } from 'react-router-dom'

import Footer from "../components/Footer";
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');


  // check if user is logged in


  // on submit button click
  const handleLogin = (async (e) => {

    e.preventDefault();
    console.log(username, password);

    const response = await fetch('/api/account/signup', {
      method: 'post',
      body: {
        "email": email,
        "username": username,
        "password": password
      }
    });


    if (!response.ok) {
      return;
    } else {
      const data = await response.json();
      console.log(data);
      setResponse(data);
    }
  });


  return (  
    <>
    <div className="login-page">
      <form className='login-form' onSubmit={handleLogin}>
        <h1>PalTrade Hub</h1>
        <div className='login-container'>
        <input type='text' id='email' name='email' placeholder='Email'
                 onChange={(e) => { setEmail(e.target.value)}}/>
          <br/><br/>
          <input type='text' id='username' name='username' placeholder='Username'
                 onChange={(e) => { setUsername(e.target.value)}}/>
          <br/><br/>
          <input type='text' id='password' name='password' placeholder='Password'
                 onChange={(e) => { setPassword(e.target.value)}}/>
          <br/><br/>
          <button type='submit'>Sign Up</button>
        </div>
        <p>{response}</p>
        <p>Have an account?</p>
        <Link to='/login'>Login</Link>
      </form>
    </div>
    <Footer />
    </>
  );
}