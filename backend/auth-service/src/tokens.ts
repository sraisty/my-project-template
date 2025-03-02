// In a real application, you'd use a proper secret key and store it securely.
const JWT_SECRET = 'your-super-secret-key' // Replace with a strong, random secret

// TODO - replace these types with your actual payload structure, one day
type FakePayload = {
  username: string
  password?: string
}

export const generateToken = (username: string): string => {
  // In a real application, use a proper JWT library like jsonwebtoken.
  // This is a very basic, insecure token generation.
  const payload: FakePayload = {
    username,
    // Add other relevant claims
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  const signature = Buffer.from(JWT_SECRET).toString('base64') //Insecure. Don't do this.
  return `${encodedPayload}.${signature}`
}

export const verifyToken = (token: string): string | null => {
  try {
    const [encodedPayload, signature] = token.split('.')
    if (Buffer.from(JWT_SECRET).toString('base64') !== signature) {
      return null
    }
    const bufferJson = Buffer.from(encodedPayload, 'base64').toString('utf-8')
    const payload = JSON.parse(bufferJson) as FakePayload
    return payload.username
  } catch (error) {
    console.log('ERROR: ', error)
    return null // Invalid token
  }
}
