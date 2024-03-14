import { React,  useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function SideNavigation() {

  const {user} = useContext(UserContext);

  if (!user) {
    return (
      <nav>
      <div className='navigation__container'>
        <ul>
          <li className="navigation__list">
            <Link className="navigation__button" to="/">Browse Pals</Link>
          </li>
          <li className='navigation__list'>
            <Link className='navigation__button' to={"/login"}>Your Account</Link>
          </li>
        </ul>
      </div>
      </nav>
    );

  } else {
    return (
      <nav>
        <div className='navigation__container'>
          <ul>
            <li className="navigation__list">
              <Link className="navigation__button" to="/">Browse Pals</Link>
            </li>
            <li className='navigation__list'>
              <Link className='navigation__button' to="/listing/create">Create Listing</Link>
            </li>
            <li className="navigation__list">
              <Link className="navigation__button" to={"/user/" + user.username +"/inventory"}>Inventory</Link>
            </li>
            <li className='navigation__list'>
              <Link className='navigation__button' to={"/user/" + user.username}>Your Account</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
;
}