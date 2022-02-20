const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
    isOnline: {type: Boolean},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String},
    lastName: {type: String},
    status: {type: String},
    age: {type: Number},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

module.exports = model('User', UserSchema);
