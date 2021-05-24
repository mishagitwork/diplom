import { Request, Response, NextFunction } from 'express'
import UC from '@useCases'

const execJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      throw new Error()
    }
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: 'Auth error' })
    }
    const { value, error } = await UC.jwtService.verify(token)
    if (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.body.userId = value?.id
    next()
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' })
  }
}

export default execJWT
