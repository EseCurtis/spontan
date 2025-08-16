# SpringAA API

A TypeScript REST API with Prisma, Express, and Swagger documentation.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── config/          # Database and Swagger configs
├── controllers/     # API controllers with CRUD operations
├── middleware/      # Error handling and 404 middleware
├── routes/          # API route definitions with Swagger docs
├── services/        # Business logic layer with Prisma
├── types/           # TypeScript interfaces and Swagger schemas
├── utils/           # Utility functions for API responses
└── index.ts         # Main application entry point
```

## 🔧 Path Aliases

The project is configured with TypeScript path aliases for cleaner imports:

- `@/*` → `src/*`
- `@/generated/*` → `generated/*`

**Note**: Path aliases work in the build process but require additional setup for development with ts-node. For now, use relative imports in development.

### Development (Relative Imports)
```typescript
import { userController } from '../controllers/userController';
import { userService } from '../services/userService';
```

### Production Build (Path Aliases)
```typescript
import { userController } from '@/controllers/userController';
import { userService } from '@/services/userService';
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🌐 API Endpoints

- **Health Check**: `GET /health`
- **API Documentation**: `GET /api-docs`
- **Users**: `GET/POST/PUT/DELETE /api/users`
- **Posts**: `GET/POST/PUT/DELETE /api/posts`
- **Comments**: `GET/POST/PUT/DELETE /api/comments`

## 🗄️ Database

The project uses PostgreSQL with Prisma ORM. Update the `.env` file with your database connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/springaa_db?schema=public"
```

## 🔒 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/springaa_db?schema=public"

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration (for future authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

## 🧪 Quality Assurance

The project includes:

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **Commitlint** - Conventional commit message validation
- **TypeScript** - Type safety and compilation

## 📚 API Documentation

Visit `http://localhost:3001/api-docs` for interactive API documentation powered by Swagger.

## 🚀 Deployment

1. Set up your database and update the `DATABASE_URL`
2. Run `npm run build` to compile TypeScript
3. Run `npm start` to start the production server
4. The server will be available on the configured port (default: 3001)

## 🤝 Contributing

1. Follow the conventional commit format
2. Run `npm run lint` and `npm run format` before committing
3. Ensure all tests pass
4. Update documentation as needed 