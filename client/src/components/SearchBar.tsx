import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState(''); // inputQuery, inputText or this
  const [isSearchInputFocused, setSearchInputFocused] = useState(false);

  const navigate = useNavigate();
  const textInput = useRef(null);

  useEffect(() => {
    const handleFocus = () => {
      (document.activeElement === textInput.current)
        ? setSearchInputFocused(true)
        : setSearchInputFocused(false);
    }

    textInput.current?.addEventListener('focus', handleFocus);
    textInput.current?.addEventListener('blur', handleFocus);

    return () => {
      textInput.current?.removeEventListener('focus', handleFocus);
      textInput.current?.removeEventListener('blur', handleFocus);
    };
  }, []);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter' && isSearchInputFocused) {
        event.preventDefault();

        findArticles();
      }
    };
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [searchInput, isSearchInputFocused]);

  const findArticles = () => {
    navigate(`/search?inputQuery=${searchInput}`);
  };

  const handleInput = (event) => {
    const encodedInput = encodeURIComponent(event.target.value);
    setSearchInput(encodedInput);
  };

  return (
    <div className='search-bar' tabIndex={0}>
        <form>
          <input
              ref={textInput}
              type="search"
              id="input"
              name="input"
              placeholder="Search.."
              onChange={handleInput}
          />
          <button
              type="submit"
              onClick={findArticles}
          > Search
          </button>
        </form>
        {/* <button
            type="submit"
            onClick={findArticles}
        >
            <i className="fa fa-search"></i>
        </button> */}
    </div>
  )
}

export default SearchBar