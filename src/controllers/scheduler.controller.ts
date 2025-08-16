import { schedulerService } from '@/services/scheduler.service';
import { NextFunction, Request, Response } from 'express';

export const schedulerController = {
  async schedule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await schedulerService.schedule();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
};
