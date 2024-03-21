import { React } from 'react';
import { Link } from 'react-router-dom';
import Trait from './Trait';
import trash from '../assets/images/delete.png'



export default function PalPreview({ userPal, user}) {
  const pal = userPal.pal[0];
  const traits = userPal.traits;

  const location = window.location.href;

  const handleClick = (async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('delete', userPal._id);

    const response = await fetch(`/api/inventory/${userPal._id}`, {
      method: 'delete'
    }); 

    if (!response.ok) {
      // add error message
      return;
    }

    window.location.reload();
  })
  
  return (
    <Link to={`${location}/${userPal._id}`} className='listing-box'>
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
        {user && (
          <div className='listing-buttons'>
            <button onClick={handleClick}><img src={trash} alt='trash' className="listing-box-delete" /></button>
          </div>
        )}
      </div>
    </Link>
  );
}
