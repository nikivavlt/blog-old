import express from 'express'
import { signIn, signUp, signOut, verify } from '../controllers/auth.js'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/verify', verify)
router.post('/signout', signOut)

export default router
