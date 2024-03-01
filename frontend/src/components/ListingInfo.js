import React from 'react';

export default function ListingInfo({ listing }) {
  const pal = listing.pal[0];
  console.log(listing);
  return (
    <div className='listing-container'>
      <img src={pal.imageURL} alt={pal.name} />

      <div className='listing-details'>
        <h4>{pal.name}</h4>
        <p>{pal.type}</p>
        <p>{listing.cost}</p>
        <p>{listing.description}</p>
      </div>

    </div>
  );
}
