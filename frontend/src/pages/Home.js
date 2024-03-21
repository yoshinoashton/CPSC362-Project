import { React, useEffect, useState }from 'react';

// components
import Layout from '../components/Layout';
import ListingPreview from '../components/ListingPreview';

export default function Home() {  
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('/api/listings');

      if (!response.ok) {
        const message = `Error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const listings = await response.json();
      if (!listings) {
        window.alert('Error: Unable to load listing JSON data. :(');
        return;
      }

      setListings(listings);
    }

    fetchListings();
  }, []);

  return (
    <Layout>
    <div className='home-container page'>
      <div className='listings'>
        {listings && listings.map(listing => (
          <ListingPreview key={listing._id} listing={listing} />  
        ))}
      </div>
    </div>
    </Layout>
  );
}