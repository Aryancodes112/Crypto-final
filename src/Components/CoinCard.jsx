import React from 'react';
import { Link } from 'react-router-dom';

const CoinCard = ({ name, id, image, market_cap_rank, current_price, currencySymbol }) => {
  return (
    <div className="p-4">
      <Link to={`/coin/${id}`} id={`card-${id}`} className="block max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 no-underline hover:shadow-lg transition-shadow duration-300">
        <img className="rounded-t-lg h-54 w-full object-cover" src={image} alt={name} />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
          <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="font-normal text-gray-700 dark:text-gray-400">{current_price ? `${currencySymbol}${current_price}` : "NA"}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">Rank: {market_cap_rank}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CoinCard;