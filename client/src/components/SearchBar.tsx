import React, { useState } from 'react'

import ArticleService from '../services/article'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState(''); // inputQuery, inputText or this

  const navigate = useNavigate();

  const findArticles = () => {
    navigate(`/search?inputQuery=${queryValue}`);
  };

  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className='search-bar'>
        <input
            type="text"
            id="input"
            name="input"
            placeholder="Search.."
            onChange={handleInput}
        />
        <button
            type="submit"
            onClick={findArticles}
        >
            <i className="fa fa-search"></i>
        </button>
    </div>
  )
}

export default SearchBar