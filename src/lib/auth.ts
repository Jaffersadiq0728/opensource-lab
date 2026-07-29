import { JwtPayload, verify } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

interface AuthPayload extends JwtPayload {
  sub: string; // user id
  role: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

export function getAuthPayload(req: NextRequest): AuthPayload | null {
  const token = req.cookies.get('auth');
  if (!token) return null;
  try {
    const payload = verify(token.value, JWT_SECRET) as AuthPayload;
    return payload;
  } catch (e) {
    console.error('Invalid JWT', e);
    return null;
  }
}

export function requireAuth(req: NextRequest): AuthPayload {
  const payload = getAuthPayload(req);
  if (!payload) {
    throw new Error('Authentication required');
  }
  return payload;
}
