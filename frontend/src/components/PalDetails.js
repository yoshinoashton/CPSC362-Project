import React from 'react';
import Trait from './Trait';

export default function PalDetails({ userPal }) {
  const pal = userPal.pal[0];
  const traits = userPal.traits;

  return (
    <div className='listing-container'>
      <img src={pal.imageURL} alt={pal.name} />

      <div className='listing-details'>
        <h4>{pal.name}</h4>
        <br></br>
        <p><strong>About this pal</strong></p>
        <p><strong>type:</strong> {pal.type}</p>
        <p><strong>lvl:</strong> {userPal.level}</p>
        <p><strong>traits:</strong></p>
        {traits && traits.map(trait => (
              <Trait trait={trait}/>
          ))}
      </div>

    </div>
  );
}
