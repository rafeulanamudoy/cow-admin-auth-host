import express, { Application } from 'express'
const app: Application = express()
import cors from 'cors'
import { routes } from './app/routes'
import globalErrorHandler from './app/middleware/globarErrorHandler'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)
app.use(globalErrorHandler)
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

export default app
