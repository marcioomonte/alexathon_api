import express from 'express'
import { OK, CREATED } from 'http-status-codes'

import provas from '../objects/provas'
import DynamoClient from '../utils/dynamo-client'

const dc = new DynamoClient()
const router = express.Router()

const TableProvas = process.env.TABLE_PROVAS
const TableQuestoes = process.env.TABLE_QUESTOES
const TableRespostas = process.env.TABLE_REPOSTAS

router.get('/disciplina', async (req, res) => {
  res.status(OK).send({ disciplina: provas })
})

router.get('/provas', async (req, res) => {
  const provas = await dc.scan({ TableName: TableProvas })

  res.status(OK).send({ provas: provas.Items })
})

router.get('/provas/:prova_id/questoes', async (req, res) => {
  const { prova_id } = req.params
  const response = await dc.scan({ TableName: TableQuestoes })
  const questoes = response.Items.filter(i => prova_id == i.prova_id)

  return res.status(OK).json(questoes)
})

router.get('/provas/:prova_id/questao/:questao_id', async (req, res) => {
  const { questao_id } = req.params

  const response = await dc.scan({ TableName: TableQuestoes })
  const questao = response.Items.find(i => questao_id == i.id)

  res.status(OK).json(questao)
})

router.post('/provas/:prova_id/respostas', async (req, res) => {
  const resposta = { ...req.body, prova_id: req.params.prova_id }

  await dc.put({ TableName: TableRespostas, Item: resposta })

  res.status(CREATED).send()
})

router.get('/provas/:prova_id/respostas', async (req, res) => {
  const { prova_id } = req.params
  const response = await dc.scan({ TableName: TableRespostas })
  const respostas = response.Items.filter(i => prova_id == i.prova_id)

  res.status(CREATED).send(respostas)
})

export default router
