const {Schema, model} = require('mongoose');


const MessageSchema = new Schema({
    userId: {type: String},
    messageLocation: {type: String},
    newMessages: {type: Array},
    messages: {type: Array},
});

module.exports = model('Message', MessageSchema);
