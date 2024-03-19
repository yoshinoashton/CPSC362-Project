import React from 'react';
import { Link } from 'react-router-dom';
import Trait from './Trait';

export default function palPreview({ userPal }) {
  const pal = userPal.pal[0];
  const traits = userPal.traits;

  const location = window.location.href;
  
  return (
    <Link to={`${location}/${pal._id}`} className='listing-box'>
      <div className='listing-box-container'>
      <img src={pal.imageURL} alt={pal.name} className="listing-box-img" />
        <div className='listing-box-info'>
          <h4>{pal.name}</h4>
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
