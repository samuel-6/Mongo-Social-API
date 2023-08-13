// Imports Schema, model and Types from Mongoose. Also imports formatDate function to format dates.
const {Schema, model, Types} = require('mongoose');
const formatDate = require('../utils/dateUtils');

// Creates a new schema for reactions.
const reactionSchema = new Schema(

    {

        // Define the properties of the reaction.
        reactionId: {

            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),

        },

        reactionBody: {

            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,

        },

        username: {

            type: String,
            required: true,

        },

        createdAt: {

            type: Date,
            default: Date.now,
            get: (createdAtVal) => {

                return formatDate(createdAtVal);

            }

        }

    },

    {

        // Define additional properties for the schema.
        toJSON: {

            getters: true, // Apply getters when converting to JSON.

        },
        id: false, // Is this necessary?
        // _id: false,

    }

);

// Exports the reaction schema.
module.exports = reactionSchema;