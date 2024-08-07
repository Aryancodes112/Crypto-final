import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
 import './News.css'
const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 10;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'crypto',
            from: '2024-07-27',
            to: '2024-07-27',
            sortBy: 'popularity',
            apiKey: '084a1e6137624db381b4cb5b5994180a'
          }
        });
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  // Get current news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="news-container container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Crypto News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentNews.map((article, index) => (
          <NewsCard
            key={index}
            title={article.title}
            urlToImage={article.urlToImage}
            url={article.url}
            description={article.description}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(news.length / newsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default News;