export const corsMiddleware = (request, response, next) => {
    const origin = request.headers.origin

    let allowedOrigins

    if (process.env.APP_ENV === "development") {
        allowedOrigins = [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
        ]
    } else {
        allowedOrigins = [process.env.FRONTEND_URL]
    }

    if (origin && allowedOrigins.includes(origin)) {
        response.setHeader("Access-Control-Allow-Origin", origin)
        response.setHeader("Vary", "Origin")
    }

    response.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    )

    response.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    )

    response.setHeader("Access-Control-Allow-Credentials", "true")

    if (request.method === "OPTIONS") {
        return response.sendStatus(204)
    }

    next()
}