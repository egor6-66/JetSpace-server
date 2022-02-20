const {Schema, model} = require('mongoose');

const ImageSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: {type: String},
    userLastName: {type: String},
    images: {type: Array},
});

module.exports = model('Image', ImageSchema);