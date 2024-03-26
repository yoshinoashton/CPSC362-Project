import Layout from "../components/Layout";
import Select from 'react-select';
import React, { useState, useEffect } from 'react';

export default function ListingCreate() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    fetch(`/api/pals`)
      .then(response => response.json())
      .then(data => {
        const formattedOptions = data.map(item => ({
          value: item._id,
          label: item.name,
          imageURL: item.imageURL // Assuming you want to use the imageURL for the preview
        }));
        setOptions(formattedOptions);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
  
    // Construct payload
    const payload = {
      palId: selectedOption ? selectedOption.value : null,
      price: price,
      description: description,
      isShiny: isShiny,
    };
  
    // Make the POST request
    fetch('/api/listings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // or response.text() if your server responds with text
    })
    .then(data => {
      console.log('Success:', data);
      // Handle success. For example, you can clear the form or redirect the user.
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors. For example, you can show an error message to the user.
    });
  };  

  const handleReset = () => {
    // Reset form state
    setSelectedOption(null);
    setPrice('');
    setDescription('');
    setIsShiny(false);
  };

  return (
    <Layout>
      <div className="create-listing-page">
        <div className="left-side">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Select
              options={options}
              value={selectedOption}
              onChange={handleChange}>
            </Select>
            <br />
            <label htmlFor="price">Enter the price: $</label>
            <input name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <br />
            <label htmlFor="desc">Write a description:</label><br />
            <textarea name="desc" rows="4" cols="50" value={description} onChange={e => setDescription(e.target.value)} />
            <br />
            <label htmlFor="isShiny">Shiny: </label>
            <input name="isShiny" type="checkbox" checked={isShiny} onChange={e => setIsShiny(e.target.checked)} />
            <br />
            <div className="buttons">
              <input type="submit" value="Create" />
              <input type="reset" value="Reset" />
            </div>
          </form>
        </div>
        <div className="right-side">
          <div className="pal-pic-preview">
            {selectedOption?.imageURL && <img src={selectedOption.imageURL} alt="Pal Preview" />}
          </div>
        </div>
      </div>
    </Layout>
  );
}
