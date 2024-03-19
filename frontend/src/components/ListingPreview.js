import React from 'react';
import { Link } from 'react-router-dom';
import Trait from './Trait';

export default function ListingPreview({ listing }) {
  const userPal = listing.userPal[0];
  const pal = userPal.pal[0];
  const traits = userPal.traits;
  
  return (
    <Link to={'/listing/' + listing._id} className='listing-box'>
      <div className='listing-box-container'>
      <img src={pal.imageURL} alt={pal.name} className="listing-box-img" />
        <div className='listing-box-info'>
          <h4>{pal.name}</h4>
          <p className='cost'>${listing.cost}</p>
        </div>
        <div className='listing-box-traits'>
          {traits && traits.map(trait => (
              <Trait key={trait._id} trait={trait}/>
          ))}
        </div>
      </div>
    </Link>
  );
}

/*
        <img src={pal.imageURL} alt={pal.name} className="listing-box-img" />
        <div className='listing-box-text'>
          <h4>{pal.name}</h4>
          <p>${listing.cost}</p>
          <Trait trait={trait}/>
        </div>


                {listings && listings.map(listing => (
          <ListingPreview key={listing._id} listing={listing} />  
*/