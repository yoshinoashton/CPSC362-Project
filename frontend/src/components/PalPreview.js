import { React } from 'react';
import { Link } from 'react-router-dom';
import Trait from './Trait';
import trash from '../assets/images/delete.png'
import edit from '../assets/images/edit.png'



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
    <Link to={`${location}/${userPal._id}`} className='preview-box'>
      <div className='preview-box-container'>
        <img src={pal.imageURL} alt={pal.name} className="preview-box-img" />
        <div className='preview-box-info'>
          <h4>{pal.name}</h4>
          <p className='level'>lvl: {userPal.level}</p>
        </div>
        <div className='preview-box-traits'>
          {traits && traits.map(trait => (
              <Trait key={trait._id} trait={trait}/>
          ))}
        </div>
        {user && (
          <div className='preview-buttons'>
            <button onClick={console.log('edit')}>
              <img src={edit} alt='edit' className="preview-box-button edit" />
            </button>

            <button onClick={handleClick}>
              <img src={trash} alt='trash' className="preview-box-button delete" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
