import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import AuthRoutes from './routes/auth'
import UserRoutes from './routes/user'
import NotificationRoutes from './routes/notification'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Routes
app.use('/auth', AuthRoutes)
app.use('/user', UserRoutes)
app.use('/notification', NotificationRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('PWA Demo Data Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})
