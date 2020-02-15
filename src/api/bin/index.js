import serverless from 'serverless-http'

import app from '../app'

export const handler = async (event, context) => {
  const serverlessHandler = serverless(app, { basePath: '/admin' })

  const response = await serverlessHandler(event, context)

  return response
}
