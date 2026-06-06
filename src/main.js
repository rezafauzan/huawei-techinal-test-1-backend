import express from "express"
import { constants } from "node:http2"
import { corsMiddleware } from "./middleware/cors.middleware.js"
import { logMiddleware } from "./middleware/log.middleware.js"
import { logger } from "./lib/logger.js"

const app = express()
app.use(corsMiddleware)
const port = process.env.PORT || 8888

app.use(express.json())
/**
 * @openapi
 * /:
 *  get:
 *      tags: ['Health Check']
 *      description: Health Check
 *      responses:
 *          200:
 *              description: Returning JSON with success and message
 */
app.get("/", logMiddleware, function (request, response) {
    response.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "Backend is running well",
        result: []
    })
})

app.listen(port, function () {
    logger.system(`Server started on port ${port}`)
})