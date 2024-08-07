import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoinCard from './CoinCard'; // Adjust the import path as necessary
import { server } from '../main';

// Add this import for styling
import './Coins.css'; // You'll create this CSS file

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currency, setCurrency] = useState('usd');
  const coinsPerPage = 9;

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}`);
        console.log('Fetched coin data:', data);
        setCoins(data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError(error);
      }
    };

    fetchCoinData();
  }, [currency]);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Pagination logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  const totalPages = Math.ceil(coins.length / coinsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    setCurrentPage(1); // Reset to first page when changing currency
  };

  return (
    <div className="coins-container container mx-auto pt-8">
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="usd"
              checked={currency === 'usd'}
              onChange={handleCurrencyChange}
              className="form-radio"
            />
            <span className="ml-2">USD</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="eur"
              checked={currency === 'eur'}
              onChange={handleCurrencyChange}
              className="form-radio"
            />
            <span className="ml-2">EUR</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="inr"
              checked={currency === 'inr'}
              onChange={handleCurrencyChange}
              className="form-radio"
            />
            <span className="ml-2">INR</span>
          </label>
        </div>
      </div>
      <div className="flex flex-wrap -mx-4">
        {currentCoins.map((coin) => (
          <div key={coin.id} className="w-full md:w-1/3 px-4 mb-8">
            <CoinCard
              id={coin.id}
              name={coin.name}
              image={coin.image}
              market_cap_rank={coin.market_cap_rank}
              current_price={coin.current_price}
              currencySymbol={currencySymbol}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Coins;