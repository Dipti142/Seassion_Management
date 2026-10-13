import type { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { verifyToken } from "../utils/token.util";
import { isLoggedIn } from "../utils/session.util";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);

    if (!user || !isLoggedIn(user)) {
      return res.status(401).json({ message: "Not logged in" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
