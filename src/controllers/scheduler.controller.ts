import { schedulerService } from '@/services/scheduler.service';
import { zodValidate } from '@/utils/helpers';
import { NextFunction, Request, Response } from 'express';

export const schedulerController = {
  async schedule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { data: payload, errors } = zodValidate(req.body, schedulerService.schemas.schedule);

      if (payload) {
        const data = await schedulerService.schedule(payload as any);
        res.status(200).json({
          success: true,
          data,
        });
      }

      if (errors) {
        res.status(500).json({
          success: false,
          errors
        })
      }

    } catch (error) {
      next(error);
    }
  },
};
