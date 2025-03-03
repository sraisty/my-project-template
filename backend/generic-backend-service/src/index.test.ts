import request from 'supertest'
import express from 'express'
import type { Express } from 'express-serve-static-core'
import dotenv from 'dotenv'
import type { Server } from 'http'
dotenv.config()

//Use a different port for testing
const TESTPORT = process.env.PORT || 3100

describe('API Endpoints', () => {
  let server: Server
  let app: Express

  beforeAll((done: jest.DoneCallback) => {
    app = express()
    app.use(express.json())

    // Fake route for testing
    app.get('/', (_req, res) => {
      res.send('Hello, world!')
    })
    // Additional fake route for testing
    app.get('/api', (_req, res) => {
      res.json({ message: 'API endpoint' })
    })
    server = app.listen(TESTPORT, done)
  })

  afterAll((done) => {
    server.close(done)
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
  it('is a fake test', () => {
    expect(true).toBeTruthy()
  })
})
