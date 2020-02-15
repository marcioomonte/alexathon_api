import express from 'express'
import nodemailer from 'nodemailer'
import { OK, CREATED } from 'http-status-codes'

import provas from '../objects/provas'
import DynamoClient from '../utils/dynamo-client'

const dc = new DynamoClient()
const router = express.Router()

const TableProvas = process.env.TABLE_PROVAS
const TableQuestoes = process.env.TABLE_QUESTOES
const TableRespostas = process.env.TABLE_RESPOSTAS

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

router.get('/provas/:prova_id/questoes/:questao_id', async (req, res) => {
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

router.post('/provas/:prova_id/finalizar', async (req, res) => {
  const { prova_id } = req.params

  const resQuestoes = await dc.scan({ TableName: TableQuestoes })
  const resRespostas = await dc.scan({ TableName: TableRespostas })

  const questoes = resQuestoes.Items.filter(i => i.prova_id == prova_id).sort((a, b) => a.numero - b.numero)
  const respostas = resRespostas.Items.filter(i => i.prova_id == prova_id)

  let email = ''
  for (const questao of questoes) {
    email += `${questao.numero}º questão: ${questao.descricao} \n`
    const resposta = respostas.find(r => r.questao_id == questao.id)

    if (resposta) {
      email += `Resposta: ${resposta.valor} \n\n`
    } else {
      email += `Não respondido! \n\n`
    }
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '2aa30e92e36789',
      pass: '2f1d6e5ad01866',
    },
  })

  const mailOptions = {
    from: 'grupohoradaprova@gmail.com',
    to: 'grupohoradaprova@gmail.com',
    subject: 'Sending Email using Node.js',
    text: email,
  }

  await transporter.sendMail(mailOptions)

  res.send({ message: 'Enviado com sucesso!' })
})

export default router
