/*
This file defines all the route handler functions for my feeds API. Each function will talk to the feedStore(in-memory database), and send the  right HTTP response. 
    1. imports the data store
    2. defines 5 controller functions (that corresponds to typical CRUD operations)
    3. exports the controller functions so the routers can use them

The following functions do the following CRUD operations: 
    1. list --> gets all the feeds
    2. getById --> gets one feed by the ID
    3. create --> add a new feed
    4. update --> modifys an existing feed
    5. remove --> deletes a feed
*/

/* 
Import the in-memory data store module as a requirement to run.

    Now I can call:
        store.list()
        store.create()
        store.find()
        store.update()
        store.remove()
*/
const store = require("../store/feedsStore");

/*
What this function does:
1. Calls store.list() to get all feeds
2. Sends them back as JSON
3. Status defaults to 200 ok

1. exports: an object takes functions (or values) to be used in other files (a whole toolbox)
2. exports.list: just one property (or function) of the object (the tool to go in the toolbox)
*/
exports.list = (req, res) => {
    /*
    1. store: from the imported module list all the feeds
    2. .json(): sends the feeds to the client in JSON format
    */
    res.json(store.list());
};

/*
What this function does:
1. Reads the id from the URL from req.params.id
2. Looks up the feed in the store
3. If its not found then it returns 404 Not Found
4. If it is found then it retuns the feed as JSON

1. exports: an object where functions or values are attached to be used in other files (a whole toolbox)
2. .getById(): read the ID provided by req.params.id
*/
exports.getById = (req, res) => {
    /*
    1. store.find: uses the function defined in the store module when called it executes in the other file (find: (id) => feeds.find(f => f.id === Number(id))
    2. req.params: is an object that contains all the route parameters from the URL
    3. req.params.id: just one property of the req.params object (id gives the value of the id parameter in a string)
    4. req: contains everything about the incoming request
    */
    const item = store.find(req.params.id);

    // Check if the resource/item exists if is not found respond 404 not found 
    if (!item) return res.status(404).json({ error: "Feed not found!" });

    // else return the item found
    res.json(item);
};

/*
What this function does:
1. Extracts name and minMagnitude from the request body
2. Validates that name exists and if its missing it give a 400 Bad Request
3. Calls store.create() to add a new feed
4. Respond with 201 Created and provides the new created feed object

1. exports: where an object where functions (or values) are attached to be used in other files (a whole toolbox)
2. exports.create: an express controller function that reads the data from req.body and calls the .create function to add new items to the data store it will send the newly created item back to the client (this is usually done with a POST request)
*/
exports.create = (req, res) => {
    /*
    Using object destructuring take the name and minMagnitude properties from req.body and create two variables with the same name. ( req.body is an object that contains data from the client in either POST or PUT requests).
    This could have been done the long way:
    const name = req.body.name;
    const minMagnitude = req.body.minMagnitude;
    */
    const { name, minMagnitude } = req.body;
    // Check whether the name exists if not send a 400 bad request response to the client needed for controllers
    if (!name) return res.status(400).json({ error: "A name is required" });
    // Else create a new feed item and provide it's true value or default value of 0 if its missing
    const created = store.create({ name, minMagnitude: minMagnitude || 0 });
    // Send a 201 created HTTP response to the client with the newly created item
    res.status(201).json(created);
};

/*
What this function does:
1. Reads the ID from the URL
2. Passes the ID and new data to store.update()
3. If the store returns null then respond that it doesnt exist with a 404
4. If new data exsists the return the updated feed

1. exports: an object where functions or values are attached to be used in other files (a whole toolbox)
2. exports.update(): a controller functionda
*/
exports.update = (req, res) => {
    /*
    Using the store update function pass in the two parameters of the ID (from the URL and the new data requested)
    */
    const updated = store.update(req.params.id, req.body);
    // If theres no update return status 404 and a JSON message
    if (!updated) return res.status(404).json({ error: "Feed not found!" });
    //Provide the updated feed in JSON format
    res.json(updated);
};

/*
What this function does:
1. Calls the store.remove() with the ID
2. If it returns false then respond with a feed not message in JSON and 404 status
3. If its successfull respond with a 204 No Content but no body since the resource is gone

1. exports: an object where functions or values are attached to be used in other files (a whole toolbox)
2. exports.update(): a controller functionda
*/
exports.remove = (req, res) => {
    //Using the store remove function pass in the URL ID
    const ok = store.remove(req.params.id);
    // If its not able to be removed then control accordingly
    if (!ok) return res.status(404).json({ error: "Feed not found!" });
    // Respond with the status
    res.status(204).send();
};
