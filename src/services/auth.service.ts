import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/password.util";
import {
  isLoggedIn,
  startLoginSession,
  forceLoginSession,
  endLoginSession,
  toUserResponse,
} from "../utils/session.util";
import { AppError } from "../utils/error.util";

export async function registerUser(name: string, email: string, password: string) {
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw new AppError("Email already registered", 409);
  }

  const user = await User.create({
    name,
    email,
    password: await hashPassword(password),
  });

  return {
    message: "Registered successfully",
    user: toUserResponse(user),
  };
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  if (isLoggedIn(user)) {
    throw new AppError("Already logged in with another device", 409, "ALREADY_LOGGED_IN");
  }

  const token = await startLoginSession(user);
  return { message: "Login successful", token, user };
}

export async function forceLoginUser(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = await forceLoginSession(user);
  return {
    message: "Force login successful. Previous device was logged out.",
    token,
    user,
  };
}

export async function logoutUser(user: User, currentSocketId?: string) {
  await endLoginSession(user, currentSocketId);
  return {
    message: "Logged out",
    user: toUserResponse(user),
  };
}
