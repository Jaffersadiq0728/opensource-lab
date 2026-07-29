import argon2 from "argon2";
import crypto from "crypto";

// Fallback pure JS / Node crypto hashing if binary argon2 binding is unavailable in certain environments
export async function hashPassword(password: string): Promise<string> {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
  } catch (err) {
    // Pure node fallback
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return `pbkdf2$${salt}$${hash}`;
  }
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    if (storedHash.startsWith("pbkdf2$")) {
      const [, salt, originalHash] = storedHash.split("$");
      const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
      return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
    }
    return await argon2.verify(storedHash, password);
  } catch (err) {
    return false;
  }
}
