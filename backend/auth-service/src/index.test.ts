import request from 'supertest'
import type { Application } from 'express'
import type { Server } from 'http'
import express from 'express'
import dotenv from 'dotenv'
import { verifyHandler } from './handlers'

dotenv.config()
//Use a different port for testing
const TESTPORT = process.env.TESTPORT || 3102

describe('verifyHandler', () => {
  let app: Application
  let server: Server

  beforeAll((done) => {
    app = express()
    app.use(express.json())
    app.get('/verify', verifyHandler as Application)
    server = app.listen(TESTPORT, done)
  })

  afterAll((done) => {
    server.close(done)
  })

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/verify') // Assign the response to a variable
    expect(response.status).toBe(401)
    expect((response.body as { message: string }).message).toBe('No token provided')
    return
  })

  it('should return 401 if no token is provided', (done) => {
    request(app)
      .get('/verify')
      .then((response) => {
        expect(response.status).toBe(401)
        expect((response.body as { message: string }).message).toBe('No token provided')
        done()
      })
      .catch(done)
  })

  it('should return 403 if the token is invalid', async () => {
    const response = await request(app).get('/verify').set('Authorization', 'Bearer invalid.token')
    expect(response.status).toBe(403)
    expect((response.body as { message: string }).message).toBe('Invalid token')
    return
  })

  it.skip('should return 200 and the username if the token is valid', async () => {
    const validToken = 'valid.token' // Replace with a valid token for testing
    const response = await request(app).get('/verify').set('Authorization', `Bearer ${validToken}`)
    expect(response.status).toBe(200)
    expect((response.body as { username: string }).username).toBe('testuser') // Replace with the expected username
  })
})
