import { React,  useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useParams, Link } from 'react-router-dom';

import Layout from "../components/Layout";
import PalPreview from "../components/PalPreview";

export default function InventoryPage() {
  // TODO: formatting (css)
  const params = useParams();
  const param_username = params.id;
  const { username } = useContext(UserContext);
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const loadInventory = async () => {

      const response = await fetch(`/api/inventory/${param_username}`);

      if (!response.ok) {
        const message = `Error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const data = await response.json();
      if (!data.success) {
        window.alert('Error: Unable to load listing JSON data. :(');
        return;
      }

      const pals = data.pals;
      setInventory(pals);
    }

    loadInventory(param_username);
  }, []);
  // TODO: create function for the button click of adding pal

  // TODO: if the same user then add button to page to add pals to their inventory
  // TODO: when button clicked -> pop up form or change to new page then send request to backend


  if (username === param_username) {
    return (
    <Layout>
      <div className='inventory-page'>
      <Link to={`/user/${param_username}`}>{param_username}</Link>
        <div className='inventory'>
          {inventory && inventory.map(pal => ( <PalPreview key={pal._id} userPal={pal}/> ))}
        </div> 
      </div>
    </Layout>
    );
  } 
  else {
    return (
      <Layout>
      <div className='inventory-page'>  
        <div className='inventory'>  
          {inventory && inventory.map(pal => ( <PalPreview key={pal._id} userPal={pal}/> ))}
        </div> 
      </div>
      </Layout>
      );
  }
}