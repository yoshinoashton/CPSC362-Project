import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import Trait from './Trait';
import { UserContext } from '../context/userContext';

export default function ListingInfo({ listing }) {
  const context = useContext(UserContext);

  const userPal = listing.userPal[0];
  const pal = userPal.pal[0];
  const traits = userPal.traits;

  const Buy = async () => {
    
    const request = {
      "username": context.username
    }

    const response = await fetch(`/api/listings/buy/${listing._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const message = `Error has occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    // remove listing
    const deleteResponse = await fetch(`/api/listings/${listing._id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!deleteResponse.ok) {
      const message = `Error has occured: ${response.statusText}`;
      window.alert(message);
      return;
    }
  }

  return (
    <div className='listing-container'>
      <img src={pal.imageURL} alt={pal.name} />

      <div className='listing-details'>
        <h4>{pal.name}</h4>
        <Link to={`/user/${userPal.username}`} className='back-button'>{userPal.username}</Link>
        <p>{pal.type}</p>
        <p>{listing.cost}</p>
        <p>{listing.description}</p>
        {traits && traits.map(trait => (
              <Trait trait={trait}/>
          ))}
      </div>
      <button onClick={Buy}>Buy</button>

    </div>
  );
}
