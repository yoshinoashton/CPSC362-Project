import Layout from "../components/Layout";
import React from 'react';
import Select from 'react-select';
import {useState} from 'react';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

export default function ListingCreate() {
  const login = true;
  if (!login) {
    // prompt user to login
  }
  const [selectedOption, setSelectedOption] = useState('');
  const handleChange = ((selectedOption) => {
    setSelectedOption(selectedOption);
});

  return (
    <Layout>
      <div className="create-listing-page">
        <select
        options={options}
        value={selectedOption}
        onChange={handleChange}></select>
      </div>
    </Layout>
  );
}