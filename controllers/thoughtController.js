// Import the Thought and User models.
const {Thought, User} = require('../models');

// Define the "thoughtController" object which contains methods for handling various CRUD operations.
const thoughtController = {

    // Get all thoughts.
    async getAllThoughts(req, res) {

        try {

            // Find all thoughts in the data base, populates them with their associated reactions, and sorts them by descending order of their creation date.
            const dbThoughtData = await Thought.find({}).populate('reactions').sort({createdAt: -1});

            // Responds with the sorted thought data.
            res.json(dbThoughtData);

        }
        catch (err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Get a thought by ID.
    async getThoughtById(req, res) {

        try {

            // Find a thought by it's ID in the data base, and populates it with it's associated reactions.
            const dbThoughtData = await Thought.findOne({_id: req.params.thoughtId}).populate('reactions');

            // If there is no thought with that ID, respond with a 404 status.
            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't retrieve a thought with that ID"});

            }

            // Responds with the thought data.
            res.json(dbThoughtData);

        }
        catch (err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Create a new thought.
    async createNewThought(req, res) {

        try {

            // Creates a new thought in the data base, using the request body.
            const dbThoughtData = await Thought.create(req.body);

            // Finds the user with the ID specified in the request body, and pushes the ID of the newly created thought to the user's "thoughts" array.
            const dbUserData = await User.findOneAndUpdate(

                {_id: req.body.userId}, // Finds the user by it's ID.
                {$push: {thoughts: dbThoughtData._id}}, // Pushes the ID of the newly created thought to the user's "thoughts" array.
                {new: true} // Returns the updated user data.

            )

            // If there is no user with that ID, respond with a 404 status.
            if (!dbUserData) {

                return res.status(404).json({message: "Couldn't find a user with that ID"});

            }

            // Responds with the newly created thought data.
            res.json(dbThoughtData);

        }
        catch (err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Update a thought.
    async updateThoughtById(req, res) {

        try {

            // Finds a thought by it's ID in the data base, and updates it with the request body.
            const dbThoughtData = await Thought.findOneAndUpdate(

                {_id: req.params.thoughtId}, // Finds the thought by it's ID.
                {$set: req.body}, // Updates the thought with the request body.
                {runValidators: true, new: true} // Runs the validators and returns the updated thought.

            );

            // If there is no thought with that ID, respond with a 404 status.
            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't find a thought with that ID"});

            }

            // Responds with the updated thought data.
            res.json(dbThoughtData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Delete a thought.
    async deleteThought(req, res) {

        try {

            // Finds a thought by it's ID in the data base, deletes it and it's associated reactions.
            const dbThoughtData = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            // If there is no thought with that ID, respond with a 404 status.
            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't find a thought with that ID"});

            }

            // Responds with a message confirming the deletion.
            res.json({message: "Thought successfully deleted"});

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Add a new reaction to a thought.
    async addReaction(req, res) {

        try {

            // Finds a thought by it's ID in the data base, and adds the request body to it's "reactions" array.
            const dbThoughtData = await Thought.findOneAndUpdate(

                {_id: req.params.thoughtId}, // Finds the thought by it's ID.
                {$addToSet: {reactions: req.body}}, // Adds the request body to the thought's "reactions" array.
                {new: true, runValidators: true} // Returns the updated thought data.

            );

            // If there is no thought with that ID, respond with a 404 status.
            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't find a thought with that ID"});

            }

            // Responds with the updated thought data.
            res.json(dbThoughtData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Delete a reaction from a thought.
    async deleteReaction(req, res) {

        try {

            // Finds a thought by it's ID in the data base, and deletes the reaction with the specified ID from it's "reactions" array.
            const dbThoughtData = await Thought.findOneAndUpdate(

                {_id: req.params.thoughtId}, // Finds the thought by it's ID.
                {$pull: {reactions: {reactionId: req.params.reactionId}}}, // Deletes the reaction with the specified ID from the thought's "reactions" array.
                {new: true} // Returns the updated thought data.

            );

            // If there is no thought with that ID, respond with a 404 status.
            if (!dbThoughtData) {

                return res.status(404).json({message: "Couldn't find a thought with that ID"});

            }

            // Responds with a message confirming the deletion.
            res.json({message: "Reaction successfully deleted"});

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

}

// Export the "thoughtController" object so it can be used in other parts of the application.
module.exports = thoughtController;