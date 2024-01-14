import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Menu from 'components/Menu'
import { Category } from 'models/category'
import { AuthContext } from 'context/AuthContext'
import ArticleService from 'services/article'
import './styles.scss'
import dateFromNow from 'utils/helpers/date-from-now.helper'
import type IArticle from 'models/article'
import cleanHTML from 'utils/helpers/clean-html'
// import { Edit } from '../../assets/images/edit.png' - this case

const SingleArticle = (): JSX.Element => {
  const [article, setArticle] = useState<IArticle>({})

  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useContext(AuthContext)

  const articleUrl = location.pathname.split('/')[2]

  useEffect(() => {
    const fetchArticle = async (): Promise<void> => {
      try {
        const articleData = await ArticleService.getArticle(articleUrl)
        setArticle(articleData.article)
      } catch (error) {
        console.log(error)

        navigate('*')
      }
    }

    fetchArticle()
  }, [articleUrl])

  const handleDelete = async (): Promise<void> => {
    try {
      await ArticleService.deleteArticle(articleUrl);

      navigate('/');
    } catch (error) {
      console.log(error);
      // Make redirection to error page?
    }
  }

  return (
    <div className='single-article'>
      <div className='content'>
        <h1>{article.title}</h1>
        <img src={article.image} alt="" />
        <div className='user'>
          <img src={article.authorImage} alt="" />
          <div className='user_info'>
            <span>{article.author}</span>
            <p>Posted { dateFromNow(article.date) } days ago</p>
          </div>
          {(currentUser !== null && currentUser.username === article.author) && <div className='buttons'>
            <Link to={`/editor?edit=${article.url}`} state={article}>
              <img src={require('../../assets/images/edit.png')} alt="Edit button" />
            </Link>
            <img onClick={handleDelete} src={require('../../assets/images/delete.png')} alt="Delete button" />
          </div>}
        </div>
        <p>
          Category: {article.category}
          <br/>
          Enum: {Category[article.id]}
          {/* Remove id from instance when get data from backend */}
          likes/ dislikes
        </p>
        comments for all with opportunity to reply, date and user role (Comment form - Photo)

        <div>
          Description:
          <p dangerouslySetInnerHTML={{ __html: cleanHTML(article.description) }}></p>
        </div>
      </div>
      <div className='menu'>
        <Menu category={article.category}></Menu>
      </div>
    </div>
  )
}

export default SingleArticle
