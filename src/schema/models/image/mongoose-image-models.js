const {
    Schema,
    model,
    ObjectId
} = require('mongoose');


const ImageSchema = new Schema({
    userId: {type: ObjectId, ref: 'User'},
    images: {type: Array},
});

module.exports = model('Image', ImageSchema);