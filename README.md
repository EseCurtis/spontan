# Sponntaneous: A Serverless Request Scheduling Service

## Overview

Sponntaneous is an open-source, serverless request scheduling service built using TypeScript, Express, and Prisma. It provides a scalable and maintainable solution for scheduling requests to external APIs, allowing developers to focus on building their applications without worrying about the underlying infrastructure.

## Features

* **Serverless Architecture**: Spontaneous is built using a serverless architecture, ensuring scalability and cost-effectiveness.
* **Request Scheduling**: Schedule requests to external APIs with ease, using a simple and intuitive API.
* **Prisma-powered Database**: Leverage the power of Prisma to manage your database, ensuring data consistency and integrity.
* **TypeScript**: Built using TypeScript, ensuring maintainability and scalability.
* **Express.js**: Utilizes Express.js for building the API, providing a flexible and modular framework.

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/spontaneous.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn dev`
4. Access the API: `http://localhost:3000`

## API Documentation

The Sponntaneous API is documented using Swagger. You can access the API documentation by visiting `http://localhost:3000/api-docs`.

### Endpoints

* **POST /schedule**: Schedule a request to an external API.
* **GET /schedule**: Retrieve a list of scheduled requests.
* **DELETE /schedule/:id**: Cancel a scheduled request.

### Request Body

* **method**: The HTTP method to use for the request (e.g., GET, POST, PUT, DELETE).
* **url**: The URL of the external API to request.
* **data**: Optional data to send with the request.
* **headers**: Optional headers to send with the request.

### Response

* **id**: The ID of the scheduled request.
* **status**: The status of the scheduled request (e.g., pending, completed, failed).

## Contributing

Sponntaneous is an open-source project, and we welcome contributions from the community. If you're interested in contributing, please fork the repository and submit a pull request.

## License

Sponntaneous is licensed under the ISC License.

## Acknowledgments

* Prisma: For providing an amazing ORM solution.
* Express.js: For providing a flexible and modular framework.
* TypeScript: For providing a maintainable and scalable language.
