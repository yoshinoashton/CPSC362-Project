import { Link } from 'react-router-dom'

import Footer from "../components/Footer";

export default function LoginPage() {
  return (
    <>
    <div className="login-page">
      <form className='login-form'>
        <h1>PalTrade Hub</h1>
        <div className='login-container'>
          <input type="text" id='username' name='username' placeholder='Email or Username'/><br/><br/>
          <input type='text' id='password' name='password' placeholder='Password'/><br/><br/>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
}