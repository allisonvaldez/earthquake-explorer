/*
This middleware logs the errors for each request and assigns the right status code. It sends a clean JSON error response to the client.

Start by exporting the function so that it can be imported by other files:
    error: the error object that was thrown by next(error)
    request: the incoming request
    respond: the response object to send data back
    next: pass the error to another handler
*/
module.exports = (error, req, res, next) => {
    // Allows to troubleshoot without exposure to the client and provides stack traces
    console.error(error);
    // Provide the HTTP status code
    const status = error.status || 500;
    // Send the JSON response back to the client with the status code
    res.status(status).json({
        error: {
            message: error.message || "Internal Server Error",
            status
        }
    });
};