import type { NextFunction, Request, Response } from "express";
import { registerUser, loginUser, forceLoginUser, logoutUser } from "../services/auth.service";
import { toUserResponse } from "../utils/session.util";
import { AppError } from "../utils/error.util";

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    return res.json({
      message: result.message,
      token: result.token,
      user: toUserResponse(result.user),
    });
  } catch (err) {
    next(err);
  }
}

export async function forceLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await forceLoginUser(email, password);
    return res.json({
      message: result.message,
      token: result.token,
      user: toUserResponse(result.user),
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      throw new AppError("Not logged in", 401);
    }

    const result = await logoutUser(req.user);
    return res.json(result);
  } catch (err) {
    next(err);
  }
}
