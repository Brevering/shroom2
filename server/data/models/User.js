const mongoose = require('mongoose');
const encryption = require('../../utilities/encryption');

module.exports.init = function () {
    let userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            required: false,
            default: false
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
        salt: String,
        hashPass: String
    });

    userSchema.method({
        authenticate: function (password, user) {
            let inputHashedPassed = encryption.generateHashedPassword(user.salt, password);

            if (inputHashedPassed === user.hashPass) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    let User = mongoose.model('User', userSchema);
};
