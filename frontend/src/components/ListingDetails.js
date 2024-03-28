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
        <Link to={`/user/${userPal.username}`} className='back-button'>{userPal.username}</Link>
        <p>{pal.type}</p>
        <p>{listing.cost}</p>
        <p>{listing.description}</p>
        {traits && traits.map(trait => (
              <Trait trait={trait}/>
          ))}
      </div>

    </div>
  );
}
