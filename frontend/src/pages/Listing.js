import { Link, useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';

import Layout from "../components/Layout";
import ListingInfo from "../components/ListingInfo";


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
  }, []);

  // Checking if listing has been recieved
  if (!listing) {
    return;
  }

  return (
    <Layout>
      <div className='listing page'>
        <ListingInfo listing={listing}/>
      </div>
    </Layout>
  );
}