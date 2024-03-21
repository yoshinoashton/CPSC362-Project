import { React,  useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Select from 'react-select';
import { UserContext } from '../context/userContext';
import Layout from "../components/Layout";
import { authenticate } from '../utils';

export default function CreatePalPage() {
   const { token, username, login } = useContext(UserContext);
  const [formData, setFormData] = useState({
    pal_name: [],
    level: 0,
    traits: []
  })
  const [palNames, setPalNames] = useState({});
  const [traitNames, setTraitNames] = useState({})
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  

  useEffect (() => {
    const fetchPalData = (async () => {
      const response = await fetch('/api/pals');

      const data = await response.json();
      if (!data) {
        window.alert('Error: Unable to load listing JSON data. :(');
        return;
      }

      const pals = await data.map(pal => ({
        label: pal.name,
        value: pal._id
      }));

      setPalNames(pals);
    })

    const fetchTraitData = (async () => {
      const response = await fetch('/api/traits');

      const data = await response.json();

      if (!data) {
        window.alert('Error: Unable to load listing JSON data. :(');
        return;
      }

      const traits = await data.map(trait => ({
        label: trait.name,
        value: trait._id
      }));

      setTraitNames(traits);
    })

    fetchPalData();
    fetchTraitData();
  }, []);

  const handleChange = ((e) => {
    console.log(e);
    if (e.length > -1) {
      if (e.length <= 4) {
        setFormData(formData => ({
          ...formData,
          traits: e
        }));
      }
    } 
    else if (e.target) {
      setFormData(formData => ({
        ...formData,
        level: e.target.value
      }))
    }
    else {
      setFormData(formData => ({
        ...formData,
        pal_name: e
      }));
    }

  });

  const handleSubmit = (async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const authenticated = await authenticate(token, username);
    if (!authenticated) {
      console.log('invalid request');
      setLoading(false);
      return;
    }

    const traits = {};
    formData.traits.map((trait, index) => {
      traits[index] = trait.label;
    })

    const request = {
      "username": username,
      "pal_name": formData.pal_name.label,
      "level": formData.level,
      "traits": traits
    }

    const response = await fetch('/api/inventory', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    }); 

    if (!response.ok) {
      const message = `Error has occured: ${response.statusText}`;
      window.alert(message);
      setLoading(false);
      return;
    }

    const data = await response.json();
    setSuccess(data.success);
    if (success) {
      console.log('Successully created pal')
    }
    setLoading(false);
  });

  if (!login) {
    return (
    <Layout>
      <p> please log in</p>
    </Layout>
    )
  }

  return (
    <Layout>
    <div className='create-pal page'>
      <form className='create-pal-form' onSubmit={handleSubmit}>
        <div className='form-top'>
          <div className='input-container name-container'>
            <label>Pal Name</label>
            <Select options={palNames} value={formData.pal_name} onChange={handleChange} /><br/>
          </div>
          <div className='input-container level-container'>
            <label>Level</label><br/>
            <input className='css-13cymwt-control level' type='number' name='level' id='level' min='1' max='50' onChange={handleChange}></input><br/>
          </div>
        </div>

        <label>Traits</label>
        <Select className='form-input' options={traitNames} value={formData.traits} isMulti='true' onChange={handleChange} /><br/>
        <button type='submit'>Submit</button>
      </form>
      {success && (
          <Navigate to={`/user/${username}/inventory`} replace={true} />
        )}
    </div>
    </Layout>
  );
}