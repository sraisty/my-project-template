import request from 'supertest'
import express from 'express'
import dotenv from 'dotenv'
import { Server } from 'http'

// filepath: /Users/sueraisty/Projects/my-project2/backend/src/index.test.ts

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

// Additional sample route
app.get('/api', (_req, res) => {
  res.json({ message: 'API endpoint' })
})

describe('API Endpoints', () => {
  let server: Server

  beforeAll((done) => {
    server = app.listen(PORT, () => {
      done()
    })
  })

  afterAll((done) => {
    server.close(() => {
      done()
    })
  })

  it('should respond with Hello, world! on GET /', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello, world!')
  })

  it('should respond with JSON on GET /api', async () => {
    const response = await request(app).get('/api')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'API endpoint' })
  })

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown')
    expect(response.status).toBe(404)
  })
})
