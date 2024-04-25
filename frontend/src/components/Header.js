import { React, useContext }from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { Popup } from 'reactjs-popup'
import downArrow from '../assets/images/down-arrow.png'



export default function Header() {

  const context = useContext(UserContext);

  function Logout() {
    context.setUsername('');
    context.setToken('');
    context.setBalance(0);
    context.setLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('balance');
  }

  console.log(context.balance)
  return (
    <nav>
      <div className="header-container">

        <div className="header-left">
          <ul className="header-lists">
            <li className="header-list">
              <Link className="header-button" to="/" refresh="true">Pal Trade Hub</Link>
            </li>
          </ul>
        </div>
        
        <div className='header-right'>
          {context.login ? (<Popup 
            className='account-popup' 
            trigger= {
              <div>
                {`${context.username}`}
                <img width="13px" height="9px" src={downArrow}></img>
              </div>
            }
            position='bottom right'>
            <div className='menu-container'>
              <Link className='menu-button top' to={`/user/${context.username}`}>Profile</Link>
              <Link className='menu-button' to={`/user/wallet`}>{`Balance: $${context.balance}`}</Link>
              <Link className='menu-button' to={`/user/${context.username}/inventory`}>Inventory</Link>
              <Link className='menu-button' to="/user/settings">Settings</Link>
              <button className="menu-button bot" onClick={Logout} refresh="true">Logout</button>
            </div>
          </Popup>) : ( <Link className="header-button" to="/login">Login</Link>)}
        </div>
        
      </div>

    </nav>
  )
}

/* 
{ context.login && (
            <Popup trigger={<button>{`$${context.balance.toFixed(2)}`}</button>} position="bottom center" >
              <div className='header-wallet'>
                <Link to="/user/add-funds">Add Funds</Link>
              </div>
            </Popup>
          )}
          <ul className='header-lists'>
              <li className="header-list">
                { context.login ? (
                  <button className="header-button" onClick={Logout} refresh="true"><p>Logout</p></button>
                ) : (
                  <Link className="header-button" to="/login">Login</Link>
                )}
              </li>
          </ul>
*/