import React, { useEffect, useState } from 'react';
import cleanHTML from 'utils/helpers/clean-html';

import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getArticles } from 'store/actions/article';
import type IArticle from 'models/article';
import type { Dispatch } from 'redux';
import type { IState } from 'store/store';
import type { IDispatch } from 'store/actions/article';

import './styles.scss';

interface IStateProps {
  articles: IArticle[]
}

interface IDispatchProps {
  getArticles: (category: string) => IDispatch
}

interface IProps extends IStateProps, IDispatchProps {}


const Articles = ({ articles, getArticles }: IProps): JSX.Element => {
  const [currentArticles, setCurrentArticles] = useState<IArticle[]>([]);

  const category = useLocation().search;

  useEffect(() => {
    getArticles(category);
  }, [category]);

  useEffect(() => {
    setCurrentArticles(articles);
  }, [articles]);

  return (
    <div>Articles (list-of-articles.component.tsx)
      <div className='articles'>
        {currentArticles.map((article) =>
          (<div className='article' key={article.id}>

            <div className='article-image'>
              <img src={article.image} alt="Article image" />
            </div>
            <div className='content'>
              <Link className='link' to={`/articles/${article.url}`}>
                <h2>
                  Title: {article.title}
                </h2>
              </Link>
              <div>
                Description: <p dangerouslySetInnerHTML={{ __html: cleanHTML(article.description) }}></p>
              </div>
              <Link to={`/articles/${article.url}`}>
                <button>
                  <p>
                    Read more
                  </p>
                </button>
              </Link>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => {
  const { articles } = state;

  return {
    articles
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getArticles: (category: string) => dispatch(getArticles(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
