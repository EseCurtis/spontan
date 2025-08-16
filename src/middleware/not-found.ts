import { NextFunction, Request, Response } from 'express';
import { AppError } from './error-handler';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {


  const error = new Error(`Route ${req.originalUrl} not found`) as AppError;
  error.statusCode = 404;

  res.json({
    success: false,
    data: {
      message: `Route ${req.originalUrl} not found`
    },
  });

  next(error);
};
