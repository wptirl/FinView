import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Cookies from 'js-cookie';

const StockData = ({ tickersymbol }) => {

  const [interval, setInterval] = useState('daily'); // Default time interval
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '565BBFBEFMPCFMLO';

  const fetchData = async () => {
    setLoading(true);
    try {
      const myCookieExists = doesCookieExist(tickersymbol);
      if (myCookieExists) {
        // Execute your code here if the cookie exists
        console.log('The cookie exists. ', tickersymbol);
        const stock_value_from_cookie = Cookies.get(tickersymbol);
        console.log(JSON.parse(stock_value_from_cookie))

        // You can do more here, such as setting state or performing other actions

      } else {
        console.log('The cookie does not exist. ', tickersymbol);
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_${interval.toUpperCase()}&symbol=${tickersymbol}&apikey=${apiKey}`;
        console.log(apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();

         // Alpha Vantage organizes data by date, so you can access it easily.

         setStockData(data['Time Series (Daily)']); // Adjust the key if using a different interval.
         Cookies.set(tickersymbol, JSON.stringify(data), { expires: 7, path: '' });
         console.log('Created the cookie.');
      }
      setLoading(false);

    } catch (error) {
      console.error('Error fetching stock data:', error);
      setLoading(false);
    }
  };

  // Function to check if a cookie exists
  const doesCookieExist = (cookieName) =>  {
    console.log('Checking the cookie:', cookieName)
    const cookieValue = Cookies.get(cookieName);
    return cookieValue !== undefined;
  }

  // Use the useEffect hook to watch for changes in the parentState prop.
  useEffect(() => {
    // Perform actions or update component state when parentState changes.
    console.log('Stock Ticker has changed:', tickersymbol);
    fetchData();
  }, [tickersymbol]); // The effect will only run when parentState changes.

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sample Data',
        data: [12, 19, 3, 5, 2],
        fill: false, // Fill under the line
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        borderWidth: 2, // Line width
      },
    ],
  };

  // Chart.js options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


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
