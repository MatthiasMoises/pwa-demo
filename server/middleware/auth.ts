import { Request, Response, NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

export interface CustomRequest extends Request {
  userData: Object | JwtPayload;
}

export const validatePasswordMatch = (req: Request, res: Response, next: NextFunction) => {
  const { password, repeatPassword } = req.body

  if (password === repeatPassword) {
    next()
  } else {
    return res.status(403).json({
      msg: 'Passwords do not match'
    })
  }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const SECRET_KEY: Secret = process.env.JWT_SECRET || '';

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).userData = decoded;
      next();
    } else {
      return res.status(401).json({
        msg: 'Not authorized'
      })
    }
  } catch (err) {
    return res.status(401).json({
      msg: 'An error occurred while authorizing user'
    })
  }
}