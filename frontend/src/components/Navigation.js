import React from 'react';
import { Link } from 'react-router-dom';

export default function SideNavigation() {
  return (
    <nav>
      <div className='navigation__container'>
        <ul>
          <li className="navigation__list">
            <Link className="navigation__button" to="/">Browse Pals</Link>
          </li>
          <li className="navigation__list">
            <Link className="navigation__button" to="/trade">Trade</Link>
          </li>
          <li className='navigation__list'>
            <Link className='navigation__button' to="/listing/create">Create Listing</Link>
          </li>
          <li className='navigation__list'>
            <Link className='navigation__button' to="/user/">Your Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}