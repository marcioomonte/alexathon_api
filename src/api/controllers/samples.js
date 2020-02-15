import express from 'express'
import { OK } from 'http-status-codes'

const router = express.Router()

router.get('/basic', async (req, res) => {
  res.status(OK).send({ message: 'samples basic' })
})

export default router
