import React from 'react';
import { Link } from 'react-router-dom'
import Trait from './Trait';

export default function ListingInfo({ listing }) {
  const userPal = listing.userPal[0];
  const pal = userPal.pal[0];
  const traits = userPal.traits;

  return (
    <div className='listing-container'>
      <img src={pal.imageURL} alt={pal.name} />

      <div className='listing-details'>
        <h4>{pal.name}</h4>
        <p><strong>${listing.cost}</strong></p>
        <br></br>
        <p><strong>About this pal</strong></p>
        <strong>Owner: </strong><Link to={`/user/${userPal.username}`} className='back-button'>{userPal.username}</Link>
        <p><strong>type: </strong>{pal.type}</p>
        <p>{listing.description}</p>
        <p><strong>traits:</strong></p>
        {traits && traits.map(trait => (
              <Trait trait={trait}/>
          ))}
      </div>

    </div>
  );
}
