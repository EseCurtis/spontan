import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

// Import routes
import schedulerRoute from './routes/scheduler.route';

// Import middleware
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';

// Import configurations
import { swaggerSpec } from './config/swagger';
import { startupWorkers } from './config/startup-workers';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/scheduler', schedulerRoute);

// API routes
app.post('/api/cb', (req, res) => {
  // console.log("LOGGER=>", req.body)
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});


// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

startupWorkers(() => {
  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
    console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
  });
})

export default app; 