import express from "express"
import {constants} from "node:http2"

const app = express()
const port = process.env.PORT || 8888

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
app.get("/", function(request, respond){
    console.log("OK")
    respond.status(constants.HTTP_STATUS_OK).json({
        success: true,
        message: "Backend is running well",
        result: []
    })
})

app.listen(port, function(){
    console.log(`App listening on port ${port}`)
})