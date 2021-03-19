const listEntries = require("./listEntries");

const getEntry = require("./getEntry");

const newEntry = require("./newEntry");

const editEntry = require("./editEntry");

const deleteEntry = require("./deleteEntry");

const addEntryPhoto = require("./addEntryPhoto");

const deleteEntryPhoto = require("./deleteEntryPhoto");

const voteEntry = require("./voteEntry");

module.exports = { 
    listEntries,
    getEntry, 
    newEntry, 
    editEntry, 
    deleteEntry, 
    addEntryPhoto,
    deleteEntryPhoto,
    voteEntry,
 };