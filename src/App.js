import logo from './logo.svg';
import './App.css';
import StockData from './Components/StockData.js'
import SearchBox from './Components/SearchBox.js'
import ChartExample from './Components/Chart.js'

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

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
  <GoogleOAuthProvider clientId="417222208314-ksqrotne1llegluegr937t2o2c19uh8h.apps.googleusercontent.com">
    <div className="app-background">
      <div className='fifty-percent-div'>
      <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
      <h1>Stock Grapher</h1>
      <SearchBox onSearch={handleSearch} />
      <StockData tickersymbol={searchQuery} />
    </div>
   </GoogleOAuthProvider>
  );
};

export default App;