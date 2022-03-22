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
    avatar: {type: String, default: `${process.env.DEFAULT_ASSETS}/no-avatar.jpeg`},
    headerAvatar: {type: String},
    likeCounter: {type: String, default: '0'},
    dislikeCounter: {type: String, default: '0'},
    subscriptions: {type: Array, default: []},
    subscribers: {type: Array, default: []},
    isOnline: {type: Boolean},
    theme: {type: String, default: 'light'},
    instagram: {type: String, default: ''},
    facebook: {type: String, default: ''},
    twitter: {type: String, default: ''},
    spotify: {type: String, default: ''},
    telegram: {type: String, default: ''},
    github: {type: String, default: ''},
    soundCloud: {type: String, default: ''},
    youTube: {type: String, default: ''},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
});

module.exports = model('User', UserSchema);
