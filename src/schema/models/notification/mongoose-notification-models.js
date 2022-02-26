const {
    Schema,
    model,
} = require('mongoose');


const NotificationSchema = new Schema({
    userId: {type: String},
    notifications: {type: Array}
});

module.exports = model('Notification', NotificationSchema);