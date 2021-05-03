import express, { Router, Request, Response } from 'express'
import UC from '@useCases'
import { IAuthUser } from '@src/models/contracts/httpClient/UserContracts'

const router: Router = express.Router()

router.get(
  '/',
  async (req: Request<any, any, IAuthUser, IAuthUser>, res: Response) => {
    const { value, error } = await UC.userService.login(req.query)
    if (error) {
      res.status(500).json(error || new Error('UC undefined error'))
      return
    }

    res.status(200).json(value)
  }
)

export default router
