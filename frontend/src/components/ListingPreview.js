import React from 'react';
import { Link } from 'react-router-dom';

export default function ListingPreview({ listing }) {
  const pal = listing.pal[0];
  return (
    <Link to={'/listing/' + listing._id} className='listing-box'>
      <div className="">
        <img src={pal.imageURL} alt={pal.name} className="listing-box-img" />
        <div className='listing-box-text'>
          <h4>{pal.name}</h4>
          <p>${listing.cost}</p>
        </div>
      </div>
    </Link>
  );
}
