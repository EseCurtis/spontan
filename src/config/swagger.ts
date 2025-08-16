import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SpringAA API',
      version: '1.0.0',
      description:
        'A TypeScript REST API with Prisma, Express, and Swagger documentation',
      contact: {
        name: 'API Support',
        email: 'support@springaa.sh',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.springaa.sh',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/types/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
