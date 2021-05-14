import express, { Router, Request, Response } from 'express'
import UC from '@useCases'

const router: Router = express.Router()

router.get('/', async (req: Request<any, any, any, any>, res: Response) => {
  const { value, error } = await UC.classService.getList(req.query)
  console.log(value)
  console.log(error)
  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.get('/:id', async (req, res) => {
  const { value, error } = await UC.classService.getByID(req.params.id)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.post('/', async (req, res) => {
  const { value, error } = await UC.classService.create(req.body)
  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.put('/:id', async (req, res) => {
  const { value, error } = await UC.classService.update(req.body)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.delete('/:id', async (req, res) => {
  const { value, error } = await UC.classService.delete(req.params.id)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

export default router
