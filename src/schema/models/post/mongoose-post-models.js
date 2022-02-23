const {
    Schema,
    model,
    ObjectId
} = require('mongoose');


const PostSchema = new Schema({
    id: {type: ObjectId, ref: 'User'},
    userName: {type: String, default: ''},
    userLastName: {type: String, default: ''},
    userAvatar: {type: String, default: ''},
    posts: {type: Array, default: []},
});

module.exports = model('Post', PostSchema);
