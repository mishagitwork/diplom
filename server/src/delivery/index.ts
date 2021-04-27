import express from 'express'
import bodyParser from 'body-parser'
import UsersRoutes from './users'
import UniversitiesRoutes from './universities'

const app: express.Application = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use('/api/users', UsersRoutes)
app.use('/api/universities', UniversitiesRoutes)

export default app
