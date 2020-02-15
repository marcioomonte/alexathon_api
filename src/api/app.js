import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

import 'express-async-errors'

import config from './config'
import exceptions from './middlewares/exceptions'

import samples from './controllers/samples'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/samples', samples)

app.use(exceptions(config.debug))

export default app
