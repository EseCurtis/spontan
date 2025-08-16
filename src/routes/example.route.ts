import { Router } from 'express';
import { exampleController } from '../controllers/example.controller';

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
router.get('/', exampleController.get);



export default router;
