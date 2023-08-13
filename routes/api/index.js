// Imports router from express. And also imports routes from userRoutes.js and thoughtRoutes.js.
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Uses router.use() to add prefix of `/users` to routes created in `userRoutes.js`.
// And also uses router.use() to add prefix of `/thoughts` to routes created in `thoughtRoutes.js`.
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// Exports router.
module.exports = router;