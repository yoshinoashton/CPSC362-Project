import Layout from "../components/Layout";
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

export default function ListingCreate() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]); // Initialize options state

  useEffect(() => {
    // Fetch data from the API
    fetch(`/api/pals`)
      .then(response => response.json())
      .then(data => {
        // Process data to fit react-select's expected format for options
        const formattedOptions = data.map(item => ({
          value: item._id, // Assuming _id is a unique identifier
          label: item.name
        }));
        setOptions(formattedOptions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once on mount

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Layout>
      <div className="create-listing-page">
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}>
        </Select>
      </div>
    </Layout>
  );
}
