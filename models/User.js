// Imports Schema and model from Mongoose.
const {Schema, model} = require('mongoose');

// Creates a new schema for users.
const userSchema = new Schema(

    {

        // Define the properties of the user.
        username: {

            type: String,
            unique: true,
            required: true,
            trim: true,

        },

        email: {

            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email address.'],

        },

        thoughts: [

            {

                type: Schema.Types.ObjectId,
                ref: 'Thought',

            },

        ],

        friends: [

            {

                type: Schema.Types.ObjectId,
                ref: 'User',

            },

        ],

    },

    {

        // Define additional properties for the schema.
        toJSON: {

            virtuals: true, // Include virtual properties when converting to JSON.

        },

        // Prevents virtuals from creating duplicate of _id as `id`.
        id: false,

    }

);

// Creates a virtual property `friendCount` that calculates the number of friends for a user.
userSchema.virtual('friendCount').get(function() {

    return this.friends.length;

});

// Creates the User model using the userSchema.
const User = model('User', userSchema);

// Exports the User model.
module.exports = User;