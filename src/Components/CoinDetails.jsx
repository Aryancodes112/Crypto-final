import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { server } from '../main';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import Chart from './Chart';

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
      case "7d":
      case "14d":
      case "30d":
      case "60d":
      case "200d":
        setDays(key);
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <div>Error While Fetching Coin</div>;

  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-full border border-gray-200 mb-4">
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>

          <div className="flex overflow-x-auto py-2 mb-4">
            {btns.map((i) => (
              <button
                key={i}
                disabled={days === i}
                onClick={() => switchChartStats(i)}
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                {i}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="inr"
                  checked={currency === 'inr'}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">INR</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="usd"
                  checked={currency === 'usd'}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">USD</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="eur"
                  checked={currency === 'eur'}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="form-radio"
                />
                <span className="ml-2">EUR</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-center opacity-70">
              Last Updated On {new Date(coin.market_data.last_updated).toLocaleString()}
            </p>

            <div className="flex justify-center">
              <img src={coin.image.large} alt={coin.name} className="w-16 h-16 object-contain" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold">{coin.name}</h2>
              <p className="text-3xl font-semibold">
                {currencySymbol}{coin.market_data.current_price[currency]}
              </p>
              <p className={`flex items-center justify-center ${
                coin.market_data.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {coin.market_data.price_change_percentage_24h > 0 ? <SlArrowUp /> : <SlArrowDown />}
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>

            <div className="text-center">
              <span className="bg-gray-800 text-white px-2 py-1 rounded text-xl">
                #{coin.market_cap_rank}
              </span>
            </div>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <div className="space-y-2">
              <Item title="Max Supply" value={coin.market_data.max_supply} />
              <Item title="Circulating Supply" value={coin.market_data.circulating_supply} />
              <Item title="Market Cap" value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
              <Item title="All Time Low" value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <Item title="All Time High" value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Item = ({ title, value }) => (
  <div className="flex justify-between">
    <span className="font-semibold">{title}</span>
    <span>{value}</span>
  </div>
);

const CustomBar = ({ high, low }) => (
  <div className="w-full">
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
    </div>
    <div className="flex justify-between mt-2">
      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">{low}</span>
      <span className="text-sm">24H Range</span>
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">{high}</span>
    </div>
  </div>
);

export default CoinDetails;
