import express from 'express'

import { addArticle, deleteArticle, getArticles, getArticle, updateArticle } from '../controllers/article.js'

const router = express.Router()

router.route('/')
  .get(getArticles)
  .post(addArticle) // createArticle

router.route('/:url')
  .get(getArticle)
  .put(updateArticle)
  .delete(deleteArticle)

export default router
