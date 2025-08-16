import { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  if (res.headersSent) {
    return next(err)
  }

  // Log error for debugging
  console.error(`Error ${statusCode}: ${message}`);
  //console.error(err.stack);

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(globalThis.process?.env?.NODE_ENV === 'development' && {
        //stack: err.stack,
      }),
    },
  });
};