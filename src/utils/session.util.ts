import User from "../models/user";
import { disconnectUserSockets } from "../socket/socket.service";
import { createToken } from "./token.util";

export function isLoggedIn(user: User) {
  return Boolean(user.login_At && !user.logout_At);
}

export function toUserResponse(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    login_At: user.login_At,
    logout_At: user.logout_At,
  };
}

export async function startLoginSession(user: User) {
  await user.update({
    login_At: new Date(),
    logout_At: null,
  });

  return createToken(user);
}

export async function forceLoginSession(user: User) {
  disconnectUserSockets(user.id, "Logged in from another device");
  return startLoginSession(user);
}

export async function endLoginSession(user: User, currentSocketId?: string) {
  disconnectUserSockets(user.id, "You logged out", currentSocketId);

  await user.update({
    logout_At: new Date(),
  });
}
