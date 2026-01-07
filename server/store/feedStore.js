/*
This module provides a CRUD data store for feeds. It lists, creates, finds, updates, and deletes feed items.
*/

// An array that stores all feed items
let feeds = [];
let nextId = 1;

// For each request this middleware exports all of the functions created below.
module.exports = {
    // Returns a copy of the original feeds array to prevents modification
    list: () => feeds.slice(),

    // Creates a new feed
    create: (feed) => {
        // Defines an item  
        const item = {
            //  Assign the current ID number and increment it
            id: nextId++,
            // Provide the time of creation
            createdAt: new Date().toISOString(),
            // The spread operator takes the key value pairs inside the old object and builds a new object with the spread and new information
            ...feed
        };
        // Add the new item to the feeds array
        feeds.push(item);
        // Return the new updated item
        return item;
    },

    /*
    Looks for the feed with the specified ID
        Number(id): performs the conversion needed to ensure the ID is a number
        .find(): returns the matching feed or returns an error
    */
    find: (id) => feeds.find(f => f.id === Number(id)),

    // Updates the proper feed with provided
    update: (id, data) => {
        /*  
        .findIndex(): find the INDEX of the matching feed ID provided
        Number(id): performs the conversion needed to ensure the ID is a number
        */
        const idx = feeds.findIndex(f => f.id === Number(id));
        // If the INDEX doesn't exist return null
        if (idx === -1) return null;
        /*
        Replace the old feed at the found INDEX with the new feed data provided (if the data matches then that data is updated new data is added)
            feeds[idx]: the feed object at the specific INDEX
            ...feeds[idx]: spread (or copy) the existing properties at the INDEX into the new data object
            ...data: spread (or copy)  the new data into the same running data object
        */
        feeds[idx] = { ...feeds[idx], ...data };
        // Return the updated feed at the provided INDEX
        return feeds[idx];
    },

    // Remove the feed based on the id provided
    remove: (id) => {
        /*  
        .findIndex(): find the INDEX of the matching feed ID provided
        Number(id): performs the conversion needed to ensure the ID is a number
        */
        const idx = feeds.findIndex(f => f.id === Number(id));
        // If the INDEX doesn't exist return null
        if (idx === -1) return false;
        // .splice(): remove one item from the feed array at the INDEX location
        feeds.splice(idx, 1);
        // If the operation is successful return true
        return true;
    }
};