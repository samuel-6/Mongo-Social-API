// Import the Moongose library for MongoDB interaction.
const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided URI or by default to the local database.
mongoose.connect(

    process.env.MONGODB_URI || "mongodb://localhost:27017/social-network",

    {

        useNewUrlParser: true,  // Use the new URL parser instead of the default (deprecated).
        useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine.

    }

);

// Export the Moongose connection object so that it can be used elsewhere in the application.
module.exports = mongoose.connection;