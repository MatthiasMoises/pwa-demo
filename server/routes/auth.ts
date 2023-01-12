import { isAuthenticated } from './../middleware/auth';
import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { encryptPassword } from './../helpers/encrypt-password'
import jwt, { Secret } from 'jsonwebtoken'
import { validatePasswordMatch } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

router.post('/register',
  [
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

    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    if (existingUser) return res.status(400).json({ error: 'User already exists ' })

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await encryptPassword(req.body.password)
      }
    })

    res.status(201).json(user)
  })

router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().trim(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const SECRET_KEY: Secret = process.env.JWT_SECRET || ''

    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email
      }
    })

    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(400).json({
            msg: 'Incorrect password'
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            SECRET_KEY,
            {
              expiresIn: process.env.JWT_EXPIRATION
            }
          )

          return res.status(200).json({
            token,
            user
          })
        }
      })
    }
    else {
      return res.status(400).json({
        msg: 'Username or password is incorrect'
      })
    }
  })


router.post('/logout', [isAuthenticated], async (req: Request, res: Response) => {
  return res.status(200).json({ msg: 'success' })
})

export default router
