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
  return res
    .status(OK)
    .json(questoes.filter(q => q.prova_id === Number(prova_id)));
});

router.get('/provas/:prova_id/questao/:questao_id', async (req, res) => {
  const { questao_id } = req.params;

  const questao = questoes.filter(q => q.id === Number(questao_id));

  res.status(OK).json(questao);
});

export default router;
