import React from 'react';

const ExchangeCard = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (
    <div className="flex justify-center my-4">
      <div className="flex items-center h-24 w-[1200px] border-b border-gray-300 p-4 rounded-lg bg-white shadow-md">
        <div className="flex items-center pr-8 min-w-[400px]">
          <img src={image} alt="crypto" className="h-12 w-12 mr-4" />
          <h1 className="text-lg w-[250px] font-semibold">{name}</h1>
          <p className="uppercase text-gray-500">{symbol}</p>
        </div>
        <div className="flex justify-between w-full text-right space-x-4">
          <p className="w-[180px] text-lg font-medium">${price}</p>
          <p className="w-[220px] text-lg font-medium">${volume.toLocaleString()}</p>
          {/* <p className={`w-[140px] text-lg font-medium ${priceChange < 0 ? 'text-red-600' : 'text-green-500'}`}>
            {priceChange.toFixed(2)}%
          </p> */}
          {/* <p className="w-[300px] text-lg font-medium">Mkt Cap: ${marketcap.toLocaleString()}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
