// Import the Thought and User models.
const {Thought, User} = require('../models');

// Define the "userController" object, which contains methods for handling user related operations.
const userController = {

    // Get all users.
    async getAllUsers(req, res) {

        try {

            // Finds all users in the data base, and excludes the "__v" field.
            const dbUserData = await User.find().select("-__v");

            // Responds with the user data.
            res.json(dbUserData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Get one user by ID.
    async getUserById(req, res) {

        try {

            // Finds a user by it's ID in the data base, and excludes the "__v" field.
            const dbUserData = await User.findOne({_id: req.params.userId}).select("-__v");

            // If there is no user with that ID, respond with a 404 status.
            if (!dbUserData) {

                return res.status(404).json({message: "Couldn't retrieve a user with that ID"});

            }

            // Responds with the user data.
            res.json(dbUserData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Create a new user.
    async createUser(req, res) {

        try {

            // Creates a new user in the data base.
            const dbUserData = await User.create(req.body);

            // Responds with the user data.
            res.json(dbUserData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Update a user.
    async updateUser(req, res) {

        try {

            // Finds a user by it's ID in the data base, and updates it with the data from the request body.
            const dbUserData = await User.findOneAndUpdate(

                {_id: req.params.userId}, // Finds a user by it's ID.
                {$set: req.body}, // Updates the user with the data from the request body.
                {runValidators: true, new: true} // Makes sure the updated user data is returned.

            );

            // If there is no user with that ID, respond with a 404 status.
            if (!dbUserData) {

                return res.status(404).json({message: "Couldn't find a user with that ID"});

            }

            // Responds with the updated user data.
            res.json(dbUserData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Delete a user.
    async deleteUser(req, res) {

        try {

            // Finds a user by it's ID in the data base, deletes it, and its associated thoughts.
            const dbUserData = await User.findOneAndDelete({_id: req.params.userId});

            // If there is no user with that ID, respond with a 404 status.
            if (!dbUserData) {

                return res.status(404).json({message: "Couldn't find a user with that ID"});

            }

            // Deletes all thoughts associated with the deleted user.
            await Thought.deleteMany({_id: {$in: dbUserData.thoughts}});

            // Responds with a success message.
            res.json({message: "User and associated thoughts deleted"});

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Add a friend.
    async addFriend(req, res) {

        try {

            // Finds a user by it's ID in the data base, and adds the friend ID to the friends array.
            const dbUserData = await User.findOneAndUpdate(

                {_id: req.params.userId}, // Finds a user by it's ID.
                {$addToSet: {friends: req.params.friendId}}, // Adds the friend ID to the friends array.
                {new: true, runValidators: true} // Makes sure the updated user data is returned.

            );

            // If there is no user with that ID, respond with a 404 status.
            if (!dbUserData) {

                return res.status(404).json({message: "Couldn't find a user with that ID"});

            }

            // Responds with the updated user data.
            res.json(dbUserData);

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

    // Remove a friend.
    async removeFriend(req, res) {

        try {

            // Finds a user by it's ID in the data base, and removes the friend ID from the friends array.
            const dbUserData = await User.findOneAndUpdate(

                {_id: req.params.userId}, // Finds a user by it's ID.
                {$pull: {friends: req.params.friendId}}, // Removes the friend ID from the friends array.
                {new: true, runValidators: true} // Makes sure the updated user data is returned.

            );

            // If there is no user with that ID, respond with a 404 status.
            if (!dbUserData) {

                return res.status(404).json({message: "Couldn't find a user with that ID"});

            }

            // Responds with a success message.
            res.json({message: "Friend removed successfully"});

        }
        catch(err) {

            // If there is an error, log it to the console and respond with a 500 status.
            console.log(err);
            res.status(500).json(err);

        }

    },

}

// Export the "userController" object, so it can be used in other parts of the application.
module.exports = userController;