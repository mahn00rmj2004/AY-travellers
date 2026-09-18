import jwt, { JwtPayload as DefaultJwtPayload, SignOptions } from 'jsonwebtoken';

// 1. Strict Environment Variable Check
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET is not defined in environment variables.');
}

// 2. Custom Payload Interface
export interface CustomJwtPayload extends DefaultJwtPayload {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

/**
 * Generates a signed Access Token
 * Default Expiry: 1 hour
 */
export function signJwtAccessToken(
  payload: Omit<CustomJwtPayload, 'iat' | 'exp'>,
  expiresIn: SignOptions['expiresIn'] = '1h'
): string {
  const options: SignOptions = {
    expiresIn,
    algorithm: 'HS256',
  };

  return jwt.sign(payload, JWT_SECRET as string, options);
}

/**
 * Verifies and decodes the Access Token
 * Returns decoded payload if valid, otherwise returns null
 */
export function verifyJwtAccessToken(token: string): CustomJwtPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string, {
      algorithms: ['HS256'],
    });

    return decoded as CustomJwtPayload;
  } catch (error) {
    return null;
  }
}