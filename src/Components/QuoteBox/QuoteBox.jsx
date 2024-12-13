/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './QuoteBox.css';
import { FaShuffle } from "react-icons/fa6";
import { Player } from '@lottiefiles/react-lottie-player';

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

const QuoteBox = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(true);

  const randomCategory = [
    "age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty", "best", "birthday", "business", "car", "change", "communication", "computers", "cool", "courage", "dad", "dating", "death", "design", "dreams", "education", "environmental", "equality", "experience", "failure", "faith", "family", "famous", "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future", "god", "good", "government", "graduation", "great", "happiness", "health", "history", "home", "hope", "humor", "imagination", "inspirational", "intelligence", "jealousy", "knowledge", "leadership", "learning", "legal", "life", "love", "marriage", "medical", "men", "mom", "money", "morning", "movies", "success"
  ];

  const getQuote = async () => {
    setLoading(true);
    const category = randomCategory[Math.floor(Math.random() * randomCategory.length)];

    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { 'X-Api-Key': apiKey }
      });
      const data = await response.json();
      if (data.length > 0) {
        setQuote({
          quote: data[0].quote,
          author: data[0].author || "Unknown Author",
          category: category
        });
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className='QuoteBox'>
      <div className='top'>
        {loading ? (
          <Player 
            autoplay 
            loop  
            src="https://assets4.lottiefiles.com/packages/lf20_usmfx6bp.json"  
            style={{ height: '100px', width: '100px' }} 
          />
        ) : (
          <>
            <p className='quote'>{quote.quote}</p>
            <p className='category'>Category: <span>{quote.category}</span></p>
          </>
        )}
      </div>
      <div className='divider'></div>
      <div className='bottom'>
        <p className='author'>- {quote.author}</p>
        <button className='shuffle-btn' onClick={getQuote}>
          <FaShuffle /> Shuffle Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;
