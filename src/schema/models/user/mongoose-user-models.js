const {
    Schema,
    model,
} = require('mongoose');


const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String},
    lastName: {type: String},
    status: {type: String, default: ''},
    age: {type: Number},
    avatar: {type: String, default: `${process.env.DEFAULT_ASSETS}/noAvatar.jpeg`},
    headerAvatar: {type: String},
    likeCounter: {type: String, default: '0'},
    dislikeCounter: {type: String, default: '0'},
    isOnline: {type: Boolean},
    theme: {type: String, default: 'light'},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

module.exports = model('User', UserSchema);
