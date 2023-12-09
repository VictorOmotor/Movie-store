import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import './SearchBar.css';

const SearchBar = ({ callback }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    const timeout = setTimeout(() => {
      callback(value);
    }, 500);

    return () => clearTimeout(timeout); // Cleanup the timeout on component unmount or value change
  }, [value]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
        <input
          type="text"
          className="rmdb-searchbar-input"
          placeholder="Search"
          onChange={handleInputChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default SearchBar;
