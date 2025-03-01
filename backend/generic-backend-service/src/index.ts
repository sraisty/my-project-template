import express from 'express'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON requests
app.use(express.json())

// Sample route
app.get('/', (_req, res) => {
  res.send('Hello, world!')
})

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 generic-backend-service is running on http://localhost:${PORT}`)
})
