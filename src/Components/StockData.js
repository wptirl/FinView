import React, { useState, useEffect } from 'react';

const StockData = ({ tickersymbol }) => {

  const [interval, setInterval] = useState('daily'); // Default time interval
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '565BBFBEFMPCFMLO';
  // const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${tickersymbol}&apikey=${apiKey}`;

  const fetchData = async () => {
    setLoading(true);
    try {

      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${tickersymbol}&apikey=${apiKey}`;
      console.log(apiUrl)
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Alpha Vantage organizes data by date, so you can access it easily.
      setStockData(data['Time Series (Daily)']); // Adjust the key if using a different interval.

      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setLoading(false);
    }
  };

  // Use the useEffect hook to watch for changes in the parentState prop.
  useEffect(() => {
    // Perform actions or update component state when parentState changes.
    console.log('Stock Ticker has changed:', tickersymbol);
    fetchData();
  }, [tickersymbol]); // The effect will only run when parentState changes.


  return (
    <div>
      <h2>Stock Data</h2>
      <div>

      </div>
      <div>

      </div>
      {loading ? (
        <p>Loading stock data...</p>
      ) : stockData ? (
        <div>
          {/* Display stock data here */}
          {/* You can map through the stockData object and render it as needed */}
          {Object.entries(stockData).map(([date, values]) => (
            <div key={date}>
              Date: {date}, Close Price: {values['4. close']}
            </div>
          ))}
        </div>
      ) : (
        <p>No stock data available.</p>
      )}
    </div>
  );
};

export default StockData;
