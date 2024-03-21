import { React,  useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';
import Layout from "../components/Layout";

export default function UserPage() {
  const params = useParams();
  const { username } = useContext(UserContext);
  const id = params.id;
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

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

    fetchUser();
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
      {userData.username === username && (<p>Hello, {userData.username}!</p>)}
      <p>{`${userData.username}'s profile`}</p>
    </div>
    </Layout>
  );
}