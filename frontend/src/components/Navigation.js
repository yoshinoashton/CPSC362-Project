import { React,  useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function SideNavigation() {

  const { login, username }= useContext(UserContext);

  if (login && username) {
    return (
      <nav>
        <div className='navigation-container'>
          <Link className="navigation-button" to="/" refresh="true">Browse Pals</Link>
          <Link className='navigation-button' to="/listing/create">Create Listing</Link>
        </div>
      </nav>
    );

  } else {
    return (
      <nav>
      <div className='navigation-container'>
          <Link className="navigation-button" to="/">Browse Pals</Link>
          <Link className='navigation-button' to={"/login"}>Your Account</Link>
      </div>
      </nav>
    )
  }
;
}