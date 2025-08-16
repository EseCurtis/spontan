import { schedulerController } from '@/controllers/scheduler.controller';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Get 
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: List 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/example'
 */
router.post('/', schedulerController.schedule);



export default router;
