import express from 'express';
import { OK } from 'http-status-codes';

import provas from '../objects/provas';
import questoes from '../objects/questoes';
const router = express.Router();

router.get('/disciplina', async (req, res) => {
  res.status(OK).send({ disciplina: provas });
});

router.get('/provas', async (req, res) => {
  res.status(OK).send({ provas: provas });
});

router.get('/provas/:prova_id/questoes', async (req, res) => {
  const { prova_id } = req.params;

  const response = questoes.filter(q => q.prova_id === prova_id);

  return res.status(OK).json(response);
});

router.post('/prova/:id/questao', async (req, res) => {
  res.status(OK).json({ questao: `${req.params.id}` });
});

export default router;
