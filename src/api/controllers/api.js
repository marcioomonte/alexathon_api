import express from 'express';
import { OK } from 'http-status-codes';

import provas from '../objects/provas';
const router = express.Router();

router.get('/disciplina', async (req, res) => {
  res.status(OK).send({ materia: 'historia' });
});

router.get('/provas', async (req, res) => {
  res.status(OK).send({ provas: provas });
});

router.get('/provas/:id/questao', async (req, res) => {
  res.status(OK).send({ questao: `${req.params.id}` });
});

router.post('/prova/:id/questao', async (req, res) => {
  res.status(OK).send({ questao: `${req.params.id}` });
});

export default router;
