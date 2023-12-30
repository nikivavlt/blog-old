import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ category }) => {
  // const [currentArticles, setCurrentArticles] = useState<IArticle[]>([])

  // const category = useLocation().search

  // useEffect(() => {
  //   getArticles(category)
  // }, [category])

  // useEffect(() => {
  //   setCurrentArticles(articles)
  // }, [articles])


  // useEffect(() => {
  //   console.log(articles)
  // }, [articles])

  return (
    <div>
        <Link className='link' to="/articles/?category=test">
          <h4>
            Test category
          </h4>
        </Link>
        <h1>Other posts you may like</h1>
        Where should be other posts (map) and 'Read more' button
    </div>
  )
}

export default Menu