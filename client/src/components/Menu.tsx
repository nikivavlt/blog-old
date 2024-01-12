import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ category }) => {
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