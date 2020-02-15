import serverless from 'serverless-http'

import config from '../config'
import app from '../app'

export const handler = async (event, context) => {
  const serverlessHandler = serverless(app, { basePath: '/admin' })

  if (config.debug) {
    console.log(JSON.stringify({ event }, null, 2))
    console.log(JSON.stringify({ context }, null, 2))
  }

  const response = await serverlessHandler(event, context)

  if (config.debug) {
    console.log(JSON.stringify({ response }, null, 2))
  }

  return response
}
