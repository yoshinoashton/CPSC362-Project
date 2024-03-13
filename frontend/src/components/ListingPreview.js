import React from 'react';
import { Link } from 'react-router-dom';
import Trait from './Trait';

export default function ListingPreview({ listing }) {
  const pal = listing.pal[0];
  const trait = { name: 'test'};
  return (
    <Link to={'/listing/' + listing._id} className='listing-box'>
      <div className="">
        <img src={pal.imageURL} alt={pal.name} className="listing-box-img" />
        <div className='listing-box-text'>
          <h4>{pal.name}</h4>
          <p>${listing.cost}</p>
          <Trait trait={trait}/>
        </div>
      </div>
    </Link>
  );
}
