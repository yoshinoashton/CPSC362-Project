import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';

import Layout from "../components/Layout";
import ListingDetails from "../components/ListingDetails";


export default function ListingPage() {
  const params = useParams();
  const id = params.id


  const [listing, setListing] = useState(null);
  useEffect(() => {

    const fetchListing = async () => {
      const response = await fetch(`/api/listings/${id}`);

      if (!response.ok) {
        const message = `Error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const listing = await response.json();
      if (!listing) {
        window.alert('Error: Unable to load listing JSON data. :(');
        return;
      }

      setListing(listing);
    }

    fetchListing();
  }, [id]);

  // Checking if listing has been recieved
  if (!listing) {
    return;
  }

  return (
    <Layout>
      <div className='listing-container page'>
        <ListingDetails listing={listing}/>
      </div>
    </Layout>
  );
}