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


/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         job_name:
 *           type: string
 *           example: "daily_backup"
 *         persistUuid:
 *           type: string
 *           example: "9f8d7e6c-1234-4abc-890d-4567ef8910ab"
 *         rule:
 *           $ref: '#/components/schemas/ScheduleRule'
 *         request:
 *           $ref: '#/components/schemas/ScheduleRequest'
 *         callbackUrl:
 *           type: string
 *           format: uri
 *           example: "https://my-service.com/scheduler/callback"
 *         status:
 *           type: string
 *           enum: [active, paused, completed, failed]
 *           example: "active"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-17T12:34:56.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-08-17T13:34:56.000Z"
 *
 *     ScheduleInput:
 *       type: object
 *       required:
 *         - rule
 *         - request
 *       properties:
 *         rule:
 *           $ref: '#/components/schemas/ScheduleRule'
 *         request:
 *           $ref: '#/components/schemas/ScheduleRequest'
 *         callbackUrl:
 *           type: string
 *           format: uri
 *           description: Optional URL to receive schedule execution results
 *           example: "https://my-service.com/scheduler/callback"
 *
 *     ScheduleRule:
 *       type: object
 *       required:
 *         - recurs
 *         - hour
 *         - minute
 *         - second
 *       properties:
 *         recurs:
 *           type: boolean
 *           example: true
 *         year:
 *           type: integer
 *           nullable: true
 *           example: null
 *         month:
 *           type: integer
 *           nullable: true
 *           example: 8
 *         date:
 *           type: integer
 *           nullable: true
 *           example: 17
 *         dayOfWeek:
 *           type: array
 *           nullable: true
 *           description: Either numbers (0–6) or range objects
 *           items:
 *             oneOf:
 *               - type: integer
 *                 example: 1
 *               - type: object
 *                 properties:
 *                   start:
 *                     type: integer
 *                     example: 1
 *                   end:
 *                     type: integer
 *                     example: 5
 *                   step:
 *                     type: integer
 *                     example: 2
 *         hour:
 *           type: integer
 *           example: 14
 *         minute:
 *           type: integer
 *           example: 30
 *         second:
 *           type: integer
 *           example: 0
 *
 *     ScheduleRequest:
 *       type: object
 *       required:
 *         - method
 *         - url
 *       properties:
 *         method:
 *           type: string
 *           enum: [GET, POST, PUT, PATCH, DELETE]
 *           example: POST
 *         url:
 *           type: string
 *           format: uri
 *           example: "https://api.my-service.com/do-something"
 *         data:
 *           type: object
 *           additionalProperties: true
 *           description: Optional payload for the request
 *           example:
 *             userId: "12345"
 *             action: "sendReport"
 *         headers:
 *           type: object
 *           additionalProperties:
 *             type: string
 *           example:
 *             Authorization: "Bearer abc123"
 *             Content-Type: "application/json"
 */
