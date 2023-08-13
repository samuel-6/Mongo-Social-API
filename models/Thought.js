// Imports Schema and model from Mongoose. Also imports Reaction model, and formatDate function to format dates.
const {Schema, model} = require('mongoose');
const Reaction = require('./Reaction');
const formatDate = require('../utils/dateUtils');

// Creates a new schema for thoughts.
const thoughtSchema = new Schema(

    {

        // Define the properties of the thought.
        thoughtText: {

            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,

        },

        createdAt: {

            type: Date,
            default: Date.now,
            get: (createdAtVal) => {

                return formatDate(createdAtVal);

            }

        },

        username: {

            type: String,
            required: true,

        },

        // Use the Reaction schema to validate data for reactions.
        reactions: [Reaction],

    },

    {

        // Define additional properties for the schema.
        toJSON: {

            virtuals: true, // Include virtual properties when converting to JSON.
            getters: true, // Apply getters when converting to JSON.

        },
        
        // Prevents virtuals from creating duplicate of _id as `id`.
        id: false,

    }

);

// Creates a virtual property `reactionCount` that calculates the number of reactions for a thought.
thoughtSchema.virtual('reactionCount').get(function() {

    return this.reactions.length;

});

// Creates the Thought model using the thoughtSchema.
const Thought = model('Thought', thoughtSchema);

// Exports the Thought model.
module.exports = Thought;