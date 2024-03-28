import { React,  useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useParams, Link } from 'react-router-dom';
import Layout from "../components/Layout";
import ListingPreview from '../components/ListingPreview';

export default function UserPage() {
  const params = useParams();
  const { username } = useContext(UserContext);
  const id = params.id;
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [listings, setListings] = useState(null);

  useEffect (() => {
    const fetchUser = async () => {

      const response = await fetch(`/api/user/${id}`);


      const data = await response.json();
      if (!data) {
        window.alert('Error: Unable to load user JSON data. :(');
        return;
      }

      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
      }

      setUserData(data);
    }

    const fetchUserListings = async () => {
      const response = await fetch(`/api/listings/user/${id}`);

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

    fetchUser();
    fetchUserListings();
  }, [id, error]);

  if (error) {
    return (
      <Layout>
      <div className='user-container page'>
        <p>{error}</p>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className='user-container page'>
      {userData.username === username && (<p>Hello, {id}!</p>)}
      {userData.username !== username && (<p>{`${id}'s profile`}</p>)}
      <div className='page-buttons'>
        <Link to={`/user/${userData.username}/inventory`} className='back-button'>Inventory</Link>
      </div>
      <div className='listings'>
        {listings && listings.map(listing => (
          <ListingPreview key={listing._id} listing={listing} />  
        ))}
      </div>
    </div>
    </Layout>
  );
}