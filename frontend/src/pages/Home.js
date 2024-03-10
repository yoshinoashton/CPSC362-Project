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

      console.log('working 2');

      setListings(listings);
    }

    fetchListings();
  }, []);


  console.log(listings);

  return (
    <Layout>
    <div className='home_page'>
      <div className='listings'>
        {listings && listings.map(listing => (
          <ListingPreview key={listing._id} listing={listing} />  
        ))}
      </div>
    </div>
    </Layout>
  );
}