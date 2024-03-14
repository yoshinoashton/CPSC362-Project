import { React } from 'react';

export default function Trait({trait}) {
  return ( 
    <div className='trait-box'>
      <p>{trait.name}</p>
    </div>
  );
}