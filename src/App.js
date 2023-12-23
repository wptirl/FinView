import logo from './logo.svg';
import './App.css';
import StockData from './Components/StockData.js'
import SearchBox from './Components/SearchBox.js'
import React, { useState } from 'react';

const App = () => {


  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    // You can perform your API call here with the 'query' parameter.
    // For simplicity, let's just log the query to the console.
    console.log(`Searching for: ${query}`);
    // Set the search query in the parent component's state
    setSearchQuery(query);

  };

  return (
    <div className="app-background">
      <h1>Stock Grapher</h1>
      <SearchBox onSearch={handleSearch} />
      <StockData tickersymbol={searchQuery} />
    </div>
  );
};

export default App;