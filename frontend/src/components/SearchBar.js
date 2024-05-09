import React, { useState } from 'react';

export const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch(/*help with fetching data*/)
        .then((response) => response.json())
        .then((json) => {
            const results = json.filter((user) => {
              return (
                value &&
                user &&
                user.name && 
                user.name.toLowerCase().includes(value)
              );
            });
            setResults(results);
        });
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

  return (
    <div className='input-wrapper'>
        <input 
          placeholder='Find pal...' 
          value={input} 
          onChange={(e) => handleChange(e.target.value)}
        />
    </div>
  )
}
