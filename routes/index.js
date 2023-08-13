// Imports the express library and creates a Router instance. Also imports the api module which contains all of the API routes.
const router = require('express').Router();
const apiRoutes = require("./api");

// Uses the imported 'apiRoutes' for any routes that begin with '/api'.
router.use('/api', apiRoutes);

// If no matching route is found, the default response is 'Wrong Route!'.
router.use((req, res) => res.send('Wrong Route!'));

// Exports the configured router to be used in the server.js file.
module.exports = router;