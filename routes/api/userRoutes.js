// Imports router from express.
const router = require("express").Router();

// Imports all methods from userController.
const {

  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,

} = require("../../controllers/userController");

// Get all users (GET /api/users).
router.route('/').get(getAllUsers);

// Get user by ID (GET /api/users/:userId).
router.route('/:userId').get(getUserById);

// Create new user (POST /api/users).
router.route('/').post(createUser);

// Update user by ID (PUT /api/users/:userId).
router.route('/:userId').put(updateUser);

// Delete user (DELETE /api/users/:userId).
router.route('/:userId').delete(deleteUser);

// Add friend (POST /api/users/:userId/friends/:friendId).
router.route('/:userId/friends/:friendId').post(addFriend);

// Remove friend (DELETE /api/users/:userId/friends/:friendId).
router.route('/:userId/friends/:friendId').delete(removeFriend);

// Exports router.
module.exports = router;