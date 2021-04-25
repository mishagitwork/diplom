import express from 'express'
import bodyParser from 'body-parser'

const app: express.Application = express()

app.use(bodyParser.json({ limit: '10mb' }))

export default app
