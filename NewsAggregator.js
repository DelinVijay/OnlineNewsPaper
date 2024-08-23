import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

import Business from '../assets/Business.jpeg';
import Education from '../assets/Education.jpeg';
import Lifestyle from '../assets/Lifestyle.jpeg';
import Science from '../assets/Science.jpeg';
import sports from '../assets/sports.jpeg';
import Tech from  '../assets/Tech.jpeg';

const NewsAggregator = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false); 
  const { theme, toggleTheme } = useTheme();
  const fetchNews = () => {
    setIsSearching(true); 
    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=58ba8afcbd724fd0adff95bf52ca0f18`)
      .then(response => setArticles(response.data.articles))
      .catch(error => console.error('Error fetching news data:', error));
  };
const handleClick = (newQuery) =>{
   setQuery(newQuery);
   fetchNews();
}
useEffect(()=>{
  if (query){
    fetchNews();
  }
},[query]
);
  return (
    <div className="news-container">
      <nav>
      <input
        type="text"
        placeholder="SEARCH FOR NEWS"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-box"
      />
      <button onClick={fetchNews} className="btn">SEARCH</button> 
      <button onClick={toggleTheme} className="btn1">CHANGE THEME</button>
      </nav>
      <div>
        {!isSearching ? (
          <div className="initial-message">
            <h2 className='text-sentence'>Welcome! Search for "any" news to get started.</h2>
            <div className="box">
              <img src={Business} onClick={()=>handleClick('business')} className="box-image"></img>
              <h3>BUSINESS</h3>
            </div>
            <div className="box">
              <img src={Education} onClick={()=>handleClick('Education')}className="box-image"></img>
              <h3>EDUCATION</h3>
            </div>
            <div className="box">
              <img src={Lifestyle} onClick={()=>handleClick('Lifestyle')} className="box-image"></img>
              <h3>LIFESTYLE</h3>
            </div>
            <div className="box">
              <img src={Science} onClick={()=>handleClick('science')} className="box-image"></img>
              <h3>SCIENCE</h3>
            </div>
            <div className="box">
              <img src={sports} onClick={()=>handleClick('sports')}className="box-image"></img>
              <h3>SPORTS</h3>
            </div>
            <div className="box">
              <img src={Tech} onClick={()=>handleClick('Tech')}className="box-image"></img>
              <h3>TECH</h3>
            </div>
          </div>
        ) : (
          articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={index} className="news-card">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))
          ) : (
            <p>No articles found. Please try another search.</p>
          )
        )}
      </div>
    </div>
  );
};

export default NewsAggregator;
