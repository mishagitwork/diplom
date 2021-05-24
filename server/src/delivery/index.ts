import express from 'express'
import bodyParser from 'body-parser'
import UsersRoutes from './users'
import UniversitiesRoutes from './university'
import AuthRoutes from './auth'
import FacultyRoutes from './faculty'
import GroupRoutes from './groups'
import StudentRoutes from './students'
import ProfessorRoutes from './professors'
import SubjectRoutes from './subjects'
import ClassRoutes from './classes'
import AttendanceRoutes from './attendance'
import AnalyticsRoutes from './analytics'

const app: express.Application = express()

app.use((req, res, next) => {
  console.log(req.body)
  next()
})

app.use(bodyParser.json({ limit: '10mb' }))
app.use('/api/auth', AuthRoutes)
app.use('/api/users', UsersRoutes)
app.use('/api/university', UniversitiesRoutes)
app.use('/api/faculty', FacultyRoutes)
app.use('/api/groups', GroupRoutes)
app.use('/api/students', StudentRoutes)
app.use('/api/professors', ProfessorRoutes)
app.use('/api/subjects', SubjectRoutes)
app.use('/api/classes', ClassRoutes)
app.use('/api/attendances', AttendanceRoutes)
app.use('/api/analytics', AnalyticsRoutes)

export default app
