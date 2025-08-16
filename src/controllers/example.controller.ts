import { NextFunction, Request, Response } from 'express';
import { exampleService } from '../services/example.service';

export const exampleController = {
  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await exampleService.get();

      console.log("LEG+>>", req.body);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
