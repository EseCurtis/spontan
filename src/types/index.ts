/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         email:
 *           type: string
 *           description: The user email
 *         name:
 *           type: string
 *           description: The user name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         name:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The user password
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         name:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The user password
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - content
 *         - authorId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The post ID
 *         title:
 *           type: string
 *           description: The post title
 *         content:
 *           type: string
 *           description: The post content
 *         authorId:
 *           type: string
 *           description: The author ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date
 *         author:
 *           $ref: '#/components/schemas/User'
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *     CreatePostInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - authorId
 *       properties:
 *         title:
 *           type: string
 *           description: The post title
 *         content:
 *           type: string
 *           description: The post content
 *         authorId:
 *           type: string
 *           description: The author ID
 *     UpdatePostInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The post title
 *         content:
 *           type: string
 *           description: The post content
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - content
 *         - postId
 *         - authorId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The comment ID
 *         content:
 *           type: string
 *           description: The comment content
 *         postId:
 *           type: string
 *           description: The post ID
 *         authorId:
 *           type: string
 *           description: The author ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date
 *         author:
 *           $ref: '#/components/schemas/User'
 *         post:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             title:
 *               type: string
 *     CreateCommentInput:
 *       type: object
 *       required:
 *         - content
 *         - postId
 *         - authorId
 *       properties:
 *         content:
 *           type: string
 *           description: The comment content
 *         postId:
 *           type: string
 *           description: The post ID
 *         authorId:
 *           type: string
 *           description: The author ID
 *     UpdateCommentInput:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The comment content
 */

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  email?: string;
  name?: string;
  password?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
  comments?: Comment[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
  post?: {
    id: string;
    title: string;
  };
}

export interface CreateCommentInput {
  content: string;
  postId: string;
  authorId: string;
}

export interface UpdateCommentInput {
  content?: string;
}
