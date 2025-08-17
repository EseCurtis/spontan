import { schedulerController } from '@/controllers/scheduler.controller';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Schedule
 *   description: Scheduler management endpoints
 */

/**
 * @swagger
 * /api/schedule/{job_name_or_persistUuid}:
 *   get:
 *     summary: Get schedule by job name or persistUuid
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: job_name_or_persistUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The job name or persistUuid of the schedule
 *     responses:
 *       200:
 *         description: Schedule details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 */
router.get('/:job_name_or_persistUuid', schedulerController.getSchedule);

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Create a new schedule
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScheduleInput'
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       400:
 *         description: Invalid input
 */
router.post('/', schedulerController.schedule);

/**
 * @swagger
 * /api/schedule/{job_name_or_persistUuid}:
 *   delete:
 *     summary: Cancel a schedule by job name or persistUuid
 *     tags: [Schedule]
 *     parameters:
 *       - in: path
 *         name: job_name_or_persistUuid
 *         required: true
 *         schema:
 *           type: string
 *         description: The job name or persistUuid of the schedule to cancel
 *     responses:
 *       200:
 *         description: Schedule canceled successfully
 *       404:
 *         description: Schedule not found
 */
router.delete('/:job_name_or_persistUuid', schedulerController.cancelSchedule);

export default router;