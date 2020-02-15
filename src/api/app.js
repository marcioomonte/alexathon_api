import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import 'express-async-errors';

import config from './config';
import exceptions from './middlewares/exceptions';

import api from './controllers/api';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);

app.use(exceptions(config.debug));

export default app;
