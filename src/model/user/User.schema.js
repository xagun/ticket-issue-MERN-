const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String
    }, address: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    refreshJWT: {
        token: {
            type: String,
            maxlength: 500,
            default: ''
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }

})

module.exports = {
    UserSchema: mongoose.model('user', UserSchema)
}

