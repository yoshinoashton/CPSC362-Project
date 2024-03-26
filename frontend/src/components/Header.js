import { React, useContext }from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function Header() {

  const context = useContext(UserContext);

  function Logout() {
    context.setUsername('');
    context.setToken('');
    context.setLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  return (
    <nav>
      <div className="header__container">

        <div className="header__left">
          <ul className="header__lists">
            <li className="header__list">
              <Link className="header__button" to="/" refresh="true">Pal Trade Hub</Link>
            </li>
          </ul>
        </div>  
        
        <div className='header__right'>
          { context.login && (
            <p>$0.00</p>
          )}
          <ul className='header__lists'>
              <li className="header__list">
                { context.login ? (
                  <button className="header__button" onClick={Logout} refresh="true">Logout</button>
                ) : (
                  <Link className="header__button" to="/login">Login</Link>
                )}
              </li>
          </ul>
        </div>
        
      </div>
    </nav>
  )
}