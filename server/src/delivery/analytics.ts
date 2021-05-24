import express, { Router, Request, Response } from 'express'
import UC from '@useCases'

const router: Router = express.Router()

router.get('/all', async (req: Request<any, any, any, any>, res: Response) => {
  const { value, error } = await UC.analyticService.countByAttended(
    req.query.studentId
  )

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.get(
  '/class',
  async (req: Request<any, any, any, any>, res: Response) => {
    const { value, error } = await UC.analyticService.countByClassAttended(
      req.query.studentId
    )

    if (error) {
      res.status(500).json(error || new Error('UC undefined error'))
      return
    }

    res.status(200).json(value)
  }
)

export default router
