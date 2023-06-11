import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

import { UserRoutes } from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
// console.log(app.get('env'))

app.use('/api/v1/users', UserRoutes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World is working')
})

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // Promise.reject(new Error('My Unhandled Promise Rejection'))
//   console.log(x)
// })

app.use(globalErrorHandler)

export default app
