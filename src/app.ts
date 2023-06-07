import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

app.use(cors())
// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
// console.log(app.get('env'))

app.use('/api/v1/users', usersRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World is working')
})

app.use(globalErrorHandler)

export default app
