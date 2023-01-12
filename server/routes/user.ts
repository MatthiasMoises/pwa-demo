import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import { encryptPassword } from './../helpers/encrypt-password'
import { validatePasswordMatch, isAuthenticated } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

router.get('/', [isAuthenticated], async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true
    }
  })

  res.status(200).json(users)
})

router.get('/:id', [isAuthenticated], async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(req.params.id)
    },
    select: {
      id: true,
      email: true,
      name: true
    }
  })

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).json({})
  }
})

router.post('/',
  [
    isAuthenticated,
    validatePasswordMatch,
    body('name').not().isEmpty().trim().escape(),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const createUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await encryptPassword(req.body.password)
      }
    })

    res.status(201).json(createUser)
  })

router.put('/:id',
  [
    isAuthenticated,
    body('name').not().isEmpty().trim().escape(),
    body('email').isEmail()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: {
        name: req.body.name,
        email: req.body.email
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    })


    res.status(200).json(updateUser)
  })

router.delete('/:id', [isAuthenticated], async (req: Request, res: Response) => {
  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })

  res.status(200).json({
    msg: 'User deleted'
  })
})

export default router
