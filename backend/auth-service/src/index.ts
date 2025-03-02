// auth-service/src/index.ts
import express from 'express'
import dotenv from 'dotenv'
import { loginHandler, registerHandler, verifyHandler } from './handlers.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001 // Choose a port for your auth service

app.use(express.json())

app.post('/register', registerHandler)

app.post('/login', loginHandler)

app.get('/verify', verifyHandler)

app.listen(PORT, () => {
  console.log(`🚀 auth-service is listening at http://localhost:${PORT}`)
})
