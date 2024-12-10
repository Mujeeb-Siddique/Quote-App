/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './QuoteBox.css';
import { FaShuffle } from "react-icons/fa6";

// Access the API key from .env file
const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
;

const QuoteBox = () => {
  const [quote, setquote] = useState({});
  
  const category = 'attitude';

  const getQuote = async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { 'X-Api-Key': apiKey } // Use the API key from .env
      });
      const data = await response.json();
      if (data.length > 0) {
        setquote({
          quote: data[0].quote,
          author: data[0].author,
          category: data[0].category,
        });
      }
    } catch (error) {
      console.log(error, "Quotes are unavailable right now");
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className='QuoteBox'>
      <div className='top'>
        <p>{quote.quote}</p>
      </div>
      <div className='divider'></div>
      <div className='bottom'>
        <p className='author'>- Author: {quote.author}</p>
        <button className='shuffle-btn' onClick={getQuote}>
          <FaShuffle /> 
        </button> 
      </div>
    </div>
  );
};

export default QuoteBox;
