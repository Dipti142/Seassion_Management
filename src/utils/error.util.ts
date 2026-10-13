import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(
    message: string,
    public status = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
      code: err.code,
    });
  }

  const message = err instanceof Error ? err.message : "Server error";
  return res.status(500).json({ message });
}
