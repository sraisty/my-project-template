// auth-service/src/index.ts

import type { Request, Response, Application } from 'express'
import express from 'express'
import bodyParser from 'body-parser'

// TODO - replace these types with your actual payload structure, one day
type FakePayload = {
  username: string
  password?: string
}

const app = express()
const port = 3001 // Choose a port for your auth service

// In a real application, you'd use a database to store users and hashed passwords.
const users = new Map<string, string>() // username -> password (plain text for simplicity, DON'T DO THIS IN PRODUCTION)

// In a real application, you'd use a proper secret key and store it securely.
const JWT_SECRET = 'your-super-secret-key' // Replace with a strong, random secret

function generateToken(username: string): string {
  // In a real application, use a proper JWT library like jsonwebtoken.
  // This is a very basic, insecure token generation.
  const payload: FakePayload = {
    username: username,
    // Add other relevant claims
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  const signature = Buffer.from(JWT_SECRET).toString('base64') //Insecure. Don't do this.
  return `${encodedPayload}.${signature}`
}

function verifyToken(token: string): string | null {
  try {
    const [encodedPayload, signature] = token.split('.')
    if (Buffer.from(JWT_SECRET).toString('base64') !== signature) {
      return null
    }

    const bufferJson = Buffer.from(encodedPayload, 'base64').toString('utf-8')
    const payload = JSON.parse(bufferJson) as unknown as FakePayload
    return payload.username
  } catch (error) {
    console.log('ERROR: ', error)
    return null // Invalid token
  }
}

app.use(bodyParser.json())

const registerHandler = (req: Request, res: Response) => {
  const { username, password } = req.body as FakePayload

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  if (users.has(username)) {
    return res.status(409).json({ message: 'Username already exists' })
  }

  users.set(username, password) // Store plain text password (BAD PRACTICE)

  return res.status(201).json({ message: 'User registered successfully' })
}
app.post('/register', registerHandler as Application)

// app.post('/register', (req: Request, res: Response) => {
//   const { username, password } = req.body as FakePayload

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' })
//   }

//   if (users.has(username)) {
//     return res.status(409).json({ message: 'Username already exists' })
//   }

//   users.set(username, password) // Store plain text password (BAD PRACTICE)

//   return res.status(201).json({ message: 'User registered successfully' })
// })

const loginHandler = (req: Request, res: Response) => {
  const { username, password } = req.body as FakePayload

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const storedPassword = users.get(username)

  if (!storedPassword || storedPassword !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken(username) // Generate a token
  res.json({ token })
}
app.post('/login', loginHandler as Application)

const verifyHandler = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1] // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const username = verifyToken(token)

  if (!username) {
    return res.status(403).json({ message: 'Invalid token' })
  }

  res.json({ username }) // Token is valid
}
app.get('/verify', verifyHandler as Application)

app.listen(port, () => {
  console.log(`🚀 auth-service is listening at http://localhost:${port}`)
})
