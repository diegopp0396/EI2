const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    handle: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    website: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    skills: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    githubusename: {
        type: String,
        required: true
    },
    social:{
        facebook:{
            type: String
        },
        twitter:{
            type: String
        },
        youtube:{
            type: String
        }
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);