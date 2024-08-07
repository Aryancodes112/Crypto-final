import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExchangesCard from './ExchangesCard'; // Adjust the import path as necessary
import { server } from '../main';
import './Exchanges.css'
const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  useEffect(() => {
    const fetchExchangeData = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log('Fetched exchange data:', data);
        setExchanges(data);
      } catch (error) {
        console.error('Error fetching exchange data:', error);
        setError(error); // Set error state
      }
    };

    fetchExchangeData();
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentExchanges = exchanges.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(exchanges.length / cardsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  return (
    <div className="exchanges-container container mx-auto">
      <div className="flex flex-wrap -mx-4">
        {currentExchanges.map((exchange) => (
          <div key={exchange.id} className="w-full md:w-1/3 px-4 mb-8">
            <ExchangesCard
              id={exchange.id}
              name={exchange.name}
              image={exchange.image}
              country={exchange.country}
              year_established={exchange.year_established}
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

export default Exchanges;
