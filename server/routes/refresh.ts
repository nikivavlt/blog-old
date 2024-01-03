import express from 'express'
import handleRefreshToken from '../controllers/refresh-token.js'

const router = express.Router()

router.post('/', handleRefreshToken)

export default router
