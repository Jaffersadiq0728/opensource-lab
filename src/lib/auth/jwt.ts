import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tyrotech-super-secret-key-production-offline-mode-2026";
const TOKEN_EXPIRY = "7d";

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}
