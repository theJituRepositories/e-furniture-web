import express from 'express'
import path from 'path'
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import sequelize from './database/connection.js'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import artworkRoutes from './routes/artworkRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

// Load environment variables from .env file
dotenv.config()

// Create Express app
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Middleware
app.use(
  cors({
    allowedHeaders: ['sessionId', 'Content-Type', 'master-token'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })
)

app.use(express.json())
// Connect to the database
sequelize
  .authenticate()
  .then(() => {
    // Routes
    app.use('/api/artwork', artworkRoutes)
    app.use('/api/users', userRoutes)
    app.use('/api/orders', orderRoutes)
    app.use('/api/upload', uploadRoutes)
    //payment config

    

    const __dirname = path.resolve()
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
    if (process.env.NODE_ENV !== 'production') {
      app.use(express.static(path.join(__dirname, 'client/public/assets')))
      app.get('*', (req, res) => {
              res.sendFile(path.resolve(__dirname, 'client','public','index.html'))
            })
    } else {
      app.get('/', (req, res) => {
        res.send('API is running....')
      })
    }
// Error handler middleware
app.use(errorHandler)
app.use(notFound)

    // Start the server
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(
        `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.green
          .bold
      )
    })
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error)
  })

console.log(process.env)
export default app
