const {Schema, model, ObjectId} = require('mongoose');


const VideoSchema = new Schema({
    userId: {type: ObjectId, ref: 'User'},
    videos: {type: Array},
});

module.exports = model('Video', VideoSchema);
