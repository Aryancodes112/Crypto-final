import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExchangeCard from './ExchangeCard'; // Adjust the import path as necessary

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 9; // Number of cards per page

  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/exchanges');
        console.log('Fetched exchange data:', data);
        setExchanges(data);
      } catch (error) {
        console.error('Error fetching exchange data:', error);
        setError(error); // Set error state
      }
    };

    fetchExchangeData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentExchanges = filteredExchanges.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredExchanges.length / cardsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="coin-search p-4">
        <h1 className="coin-text text-2xl mb-4 text-center sm:text-left">Search an Exchange</h1>
        <form>
          <input
            className="coin-input p-2 border border-gray-300 rounded w-full"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      <div className="flex flex-col space-y-4">
        {currentExchanges.map((exchange) => (
          <ExchangeCard
            key={exchange.id}
            name={exchange.name}
            price={exchange.year_established}  // Assume year as price
            symbol={exchange.country}
            marketcap={exchange.trust_score_rank}  // Assuming rank as market cap
            volume={exchange.trade_volume_24h_btc}  // Assuming 24h volume in BTC
            image={exchange.image}
            priceChange={0}  // No price change data, so defaulting to 0
          />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Exchanges;
