import express, { Router } from 'express'
import UC from '@useCases'

const router: Router = express.Router()

router.get('/', async (req, res) => {
  const { value, error } = await UC.userService.getList()

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.get('/:id', async (req, res) => {
  const { value, error } = await UC.userService.getByID(req.params.id)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.post('/', async (req, res) => {
  const { value, error } = await UC.userService.create(req.body)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.put('/:id', async (req, res) => {
  const { value, error } = await UC.userService.update(req.body)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

router.delete('/:id', async (req, res) => {
  const { value, error } = await UC.userService.delete(req.params.id)

  if (error) {
    res.status(500).json(error || new Error('UC undefined error'))
    return
  }

  res.status(200).json(value)
})

export default router
