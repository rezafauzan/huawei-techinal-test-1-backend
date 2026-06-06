import { Router } from "express";
import * as userController from "../controllers/users.controller.js"
import { logMiddleware } from "../middleware/log.middleware.js";

const userRouter = Router()

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all registered users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *       500:
 *         description: Internal server error
 */
userRouter.get("", logMiddleware, userController.getAllUsers)

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create new user
 *     description: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - address
 *               - phone
 *               - email
 *               - password
 *               - confirm_password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Reza
 *               last_name:
 *                 type: string
 *                 example: Fauzan
 *               address:
 *                 type: string
 *                 example: Jakarta Selatan
 *               phone:
 *                 type: string
 *                 example: "081234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: reza@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
userRouter.post("", logMiddleware, userController.createUser)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal server error
 */
userRouter.delete("/:id", logMiddleware, userController.deleteUser)

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Update user
 *     description: Update user information by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - address
 *               - phone
 *               - email
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Reza
 *               last_name:
 *                 type: string
 *                 example: Fauzan
 *               address:
 *                 type: string
 *                 example: Jakarta Selatan
 *               phone:
 *                 type: string
 *                 example: "081234567890"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: reza@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
userRouter.patch("/:id", logMiddleware, userController.updateUser)

export default userRouter