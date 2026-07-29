import { cookies } from "next/headers";
import { verifyToken, TokenPayload } from "./jwt";

export async function getCurrentUser(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("tyrotech_token")?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch (err) {
    return null;
  }
}
