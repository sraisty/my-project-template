import type { AuthRequestPayload } from './handlers'

// In a real application, you'd use a proper secret key and store it securely.
const JWT_SECRET = 'your-super-secret-key' // Replace with a strong, random secret

export const generateToken = (username: string): string => {
  // In a real application, use a proper JWT library like jsonwebtoken.
  // This is a very basic, insecure token generation.
  const payload: AuthRequestPayload = {
    username,
    // Add other relevant claims
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  // TODO - Insecure. Don't do this.
  const signature = Buffer.from(JWT_SECRET).toString('base64')
  return `${encodedPayload}.${signature}`
}

export const verifyToken = (token: string): string | null => {
  try {
    const [encodedPayload, signature] = token.split('.')
    if (Buffer.from(JWT_SECRET).toString('base64') !== signature) {
      return null
    }
    const bufferJson = Buffer.from(encodedPayload, 'base64').toString('utf-8')

    const parsedPayload: unknown = JSON.parse(bufferJson)
    if (!isAuthRequestPayload(parsedPayload)) {
      return null
    }

    // Now TypeScript knows parsedPayload is of type AuthRequestPayload
    return parsedPayload.username
  } catch (error) {
    console.log('ERROR: ', error)
    return null // Invalid token
  }
}

// Type guard to ensure the object matches expected shape
const isAuthRequestPayload = (payload: unknown): payload is AuthRequestPayload => {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'username' in payload &&
    typeof (payload as Record<string, unknown>).username === 'string'
  )
}
