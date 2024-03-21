import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


import Layout from "../components/Layout";
import PalDetails from '../components/PalDetails';
// import palInfo from "../components/palInfo";


export default function PalPage() {
  const {palid, id}= useParams();


  const [pal, setPal] = useState(null);
  useEffect(() => {

    const fetchpal = async () => {
      const response = await fetch(`/api/inventory/pal/${palid}`)

      if (!response.ok) {
        const message = `Error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const pal = await response.json();
      if (!pal) {
        window.alert('Error: Unable to load pal JSON data. :(');
        return;
      }

      setPal(pal);
    }

    fetchpal();
  }, [id]);

  // Checking if pal has been recieved
  if (!pal) {
    return;
  }

  return (
    <Layout>
      <div className='pal-container page'>
        <Link to={`/user/${id}/inventory`} className='back-button'>{`<`}</Link>
        <PalDetails userPal={pal} />
      </div>
    </Layout>
  );
}