import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import ArticleService from '../../services/article'

const Search = () => {
  const location = useLocation();

  useEffect(() => {
    const queryString = location.search;

    const fetchArticle = async (): Promise<void> => {
      const response = ArticleService.getArticlesByString(queryString);

      console.log(response)
    };

    fetchArticle();
  }, []);

  return (
    <div>Search</div>
  )
}

export default Search