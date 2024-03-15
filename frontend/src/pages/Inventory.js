import { React,  useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';

import Layout from "../components/Layout";

export default function UserPage() {
  // TODO: formatting (css)
  const params = useParams();
  const username = params.id;
  const {user} = useContext(UserContext);
  // TODO: create function for the button click of adding pal

  // TODO: send request to backend to fetch the user's pals
  // TODO: -- load users pals in return statements


  // TODO: if the same user then add button to page to add pals to their inventory
  // TODO: when button clicked -> pop up form or change to new page then send request to backend
  if (user.username = username) {
    return (
      <Layout>
      <div className='inventory-page'>     
        <p>matching user!</p>

        <form>
          <label>
            <select>
            </select>
          </label>
        </form>
      </div>
      </Layout>
    );
  }


  return (
  <Layout>
  <div className='inventory-page'>     

  </div>
  </Layout>
  );
}