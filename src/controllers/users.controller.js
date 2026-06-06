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

/**
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export async function createUsers(request, response) {
    const {
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        confirm_password
    } = request.body

    if (first_name === undefined || first_name.length < 4) {
        return httpResponse.badRequest(
            response,
            "Create user failed : First Name minimum 4 characters"
        )
    }

    if (last_name === undefined || last_name.length < 4) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Last Name minimum 4 characters"
        )
    }

    if (phone === undefined || phone.length < 10) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Phone Number minimum 10 digits"
        )
    }

    if (address === undefined || address.length < 10) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Address minimum 10 characters"
        )
    }

    if (email === undefined || !email.includes("@")) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Invalid email"
        )
    }

    if (password === undefined || password.length < 8) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Password too weak! minimum 8 characters"
        )
    }

    if (confirm_password !== password) {
        return httpResponse.badRequest(
            response,
            "Create user failed : Confirm password not match"
        )
    }

    try {
        const newUser = {
            first_name,
            last_name,
            address,
            phone,
            email,
            password
        }
        userModel.createUsers(newUser)

        return httpResponse.created(
            response,
            "Create user success!",
            registeredUser
        )

    } catch (error) {
        return httpResponse.serverError(
            response,
            "Create users fail! " + error
        )
    }
}