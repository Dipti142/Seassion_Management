import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: number;
}

export function createToken(user: { id: number }) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
}
