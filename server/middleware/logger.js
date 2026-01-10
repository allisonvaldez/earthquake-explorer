/* 
This middleware logs the timestamp, HTTP method, and URL of each request then passes the control to the next part of the Express app.

Start by exporting the function so that it can be imported by other files:
    request: incoming requests
    response: used to send data back 
    next: move onto the next middleware or route
*/
module.exports = (req, res, next) => {
    /*  
    new Date().toISOString: creates a timestamp
    new req.method: shows the specific HTTP method
    new req.originalUrl: shows the exact URL the client requested
    next(): go to the next middleware
    */
    console.log(new Date().toISOString(), req.method, req.originalUrl);
    next();
};