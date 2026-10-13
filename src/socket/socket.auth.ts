import type { Socket } from "socket.io";
import User from "../models/user";
import { verifyToken } from "../utils/token.util";
import { isLoggedIn } from "../utils/session.util";

export async function authenticateSocket(socket: Socket, next: (err?: Error) => void) {
  try {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) return next(new Error("Token required"));

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);

    if (!user || !isLoggedIn(user)) {
      return next(new Error("Not logged in"));
    }

    socket.data.user = user;
    next();
  } catch {
    next(new Error("Invalid token"));
  }
}
