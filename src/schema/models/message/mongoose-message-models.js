const {Schema, model} = require('mongoose');


const MessageSchema = new Schema({
    userId: {type: String},
    userName: {type: String},
    userLastName: {type: String},
    userAvatar: {type: String},
    messages: {type: Array}
});

module.exports = model('Message', MessageSchema);
