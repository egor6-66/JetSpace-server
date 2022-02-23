const {
    Schema,
    model,
    ObjectId
} = require('mongoose');


const ImageSchema = new Schema({
    id: {type: ObjectId, ref: 'User'},
    userName: {type: String},
    userLastName: {type: String},
    images: {type: Array},
});

module.exports = model('Image', ImageSchema);