// auth-service/src/handlers.ts
import type express from 'express'
import { generateToken, verifyToken } from './routes/tokens.js'

type RequestPayload = { username: string; password?: string }
type Handler = (req: express.Request, res: express.Response) => void

// TODO Fix this hack and make it secure
// In a real application, you'd use a database to store users and hashed passwords.
// username -> password (plain text for simplicity, DON'T DO THIS IN PRODUCTION)
const users = new Map<string, string>()

export const registerHandler: Handler = (req, res) => {
  const { username, password } = req.body as RequestPayload
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' })
    return
  }
  if (users.has(username)) {
    res.status(409).json({ message: 'Username already exists' })
    return
  }
  // TODO - FIX THIS: For now only, store plain text password (BAD PRACTICE)
  users.set(username, password)
  res.status(201).json({ message: 'User registered successfully' })
}

export const loginHandler: Handler = (req, res) => {
  const { username, password } = req.body as RequestPayload
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' })
    return
  }
  const storedPassword = users.get(username)
  if (!storedPassword || storedPassword !== password) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }
  const token = generateToken(username) // Generate a token
  res.json({ token })
}

export const verifyHandler: Handler = (req, res) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'No token provided' })
    return
  }
  const username = verifyToken(token)
  if (!username) {
    res.status(403).json({ message: 'Invalid token' })
  }
  res.json({ username }) // Token is valid
}
