import { React, useContext }from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function Header() {

  const context = useContext(UserContext);

  function Logout() {
    context.setUsername('');
    context.setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  return (
    <nav>
      <div className="header__container">

        <div className="header__left">
          <ul className="header__lists">
            <li className="header__list">
              <Link className="header__button" to="/">Pal Trade Hub</Link>
            </li>
          </ul>
        </div>
        
        <div className='header__right'>
          <ul className='header__lists'>
              <li className="header__list">
                { context.token && (
                  <button className="header__button" onClick={Logout}>Logout</button>
                )}
                { !context.token && (
                  <Link className="header__button" to="/login">Login</Link>
                )}
              </li>
          </ul>
        </div>
        
      </div>
    </nav>
  )
}