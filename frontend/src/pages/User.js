import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Layout from "../components/Layout";
import Select from 'react-select';

export default function UserPage() {
  const params = useParams();
  const id = params.id;
  const [userData, setUserData] = useState({});

  useEffect (() => {
    const fetchUser = async () => {
      

      const response = await fetch(`/api/user/${id}`);

      if (!response.ok) {
        const message = `Error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const user = await response.json();
      if (!user) {
        window.alert('Error: Unable to load user JSON data. :(');
        return;
      }

      setUserData(user);
    }

    fetchUser();
  }, [id]);

  return (
    <Layout>
    <div className='user-page'>
      <p>Hello, {userData.username}!</p>
      <Select></Select>
    </div>
    </Layout>
  );
}