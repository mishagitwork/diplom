import express from 'express'
import bodyParser from 'body-parser'
import UsersRoutes from './users'
import UniversitiesRoutes from './university'
import AuthRoutes from './auth'

const app: express.Application = express()

app.use(bodyParser.json({ limit: '10mb' }))
app.use('/api/auth', AuthRoutes)
app.use('/api/users', UsersRoutes)
app.use('/api/university', UniversitiesRoutes)

export default app
