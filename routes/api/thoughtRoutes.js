// Imports router from express.
const router = require('express').Router();

// Imports all methods from thoughtController.
const {

  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThoughtById,
  deleteThought,
  addReaction,
  deleteReaction,

} = require("../../controllers/thoughtController");

// Get all thoughts (GET /api/thoughts).
router.route('/').get(getAllThoughts);

// Get thought by ID (GET /api/thoughts/:thoughtId).
router.route('/:thoughtId').get(getThoughtById);

// Create new thought (POST /api/thoughts).
router.route('/').post(createNewThought);

// Update thought by ID (PUT /api/thoughts/:thoughtId).
router.route('/:thoughtId').put(updateThoughtById);

// Delete thought (DELETE /api/thoughts/:thoughtId).
router.route('/:thoughtId').delete(deleteThought);

// Add reaction (POST /api/thoughts/:thoughtId/reactions).
router.route('/:thoughtId/reactions').post(addReaction);

// Delete reaction (DELETE /api/thoughts/:thoughtId/reactions/:reactionId).
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Exports router.
module.exports = router;