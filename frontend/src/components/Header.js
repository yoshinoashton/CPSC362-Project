import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
                <Link className="header__button" to="/login">Login</Link>
              </li>
          </ul>
        </div>
        
      </div>
    </nav>
  )
}