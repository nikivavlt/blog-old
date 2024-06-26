import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Menu from 'components/Menu/Menu'
import { AuthContext } from 'context/AuthContext'
import ArticleService from 'services/article'
import './styles.scss'
import dateFromNow from 'utils/helpers/date-from-now.helper'
import type IArticle from 'models/article'
import cleanHTML from 'utils/helpers/clean-html'
import { getLikes, addLike } from 'services/likes'
import CommentSection from 'components/CommentSection/CommentSection'
// import { Edit } from '../../assets/images/edit.png' - this case

const SingleArticle = (): JSX.Element => {
  const [article, setArticle] = useState<IArticle>({})

  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useContext(AuthContext)

  const articleUrl = location.pathname.split('/')[2]

  const fetchLikes = async(id) => {
    const likes = await getLikes(id);
    return likes;
  }

  useEffect(() => {
    const fetchArticle = async (): Promise<void> => {
      try {
        const data = await ArticleService.getArticle(articleUrl)
        const articleData = data.article;

        const articleId = articleData.article_id;
        const likes = await fetchLikes(articleId);
        articleData.likes = likes.count;

        setArticle(articleData);
      } catch (error) {
        console.log(error)

        navigate('*')
      }
    }

    fetchArticle()
    // wrong implementation 2 async one after one
  }, [articleUrl])

  const handleLike = async () => {
    const likeResponse = await addLike(article.article_id, currentUser.id);
    console.log(likeResponse);

    if (likeResponse.status === 200) {
      const likes = await fetchLikes(article.article_id);

      setArticle((previousState) => ({
        ...previousState,
        likes: likes.count,
      }));
    }
  };

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
        <img src={article.image?.includes('//') ? `${article.image}` : `/${article.image}`} alt="Articles image" />
        <div className='user'>
          <img src={article.authorImage} alt="Author avatar" />
          <div className='user_info'>
            <span>{article.author}</span>
            <p>Posted { dateFromNow(article.created_at) } days ago</p>
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
        </p>
        likes:{' '}
        {article.likes}

        <button onClick={handleLike}>Like</button>
        <br></br>

        comments for all with opportunity to reply, date and user role (Comment form - Photo)

        <div>
          Description:
          <p dangerouslySetInnerHTML={{ __html: cleanHTML(article.description) }}></p>
          <CommentSection articleId={article.article_id} />
        </div>
      </div>
      <div className='menu'>
        {article 
          ? <Menu category={article.category} currentArticleId={article.article_id}></Menu>
          : <Menu category={null} currentArticleId={null} ></Menu>
        }
      </div>
    </div>
  )
}

export default SingleArticle
