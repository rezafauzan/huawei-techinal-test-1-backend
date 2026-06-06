import { httpResponse } from "../lib/http_handlers.js"
import { logger } from "../lib/logger.js"
import * as userModel from "../models/user.model.js"

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function getAllUsers(request, response) {
    try {
        const users = await userModel.getAllUsers()
        logger.api("Get all users data")
        return httpResponse.ok(
            response,
            "Get all users data",
            users
        )
    } catch (error) {
        logger.error("API", "Failed get all users data " + error)
        return httpResponse.serverError(
            response,
            "Failed get all users data " + error
        )
    }
}