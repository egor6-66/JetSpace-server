const {
    Schema,
    model,
    ObjectId,
} = require('mongoose');

//
// const likeSchema = {
//     id: {type: ObjectId},
//     userId: {type: ObjectId},
//     userName: {type: String},
//     userLastName: {type: String},
// }
//
// const postElementSchema = {
//     id: {type: ObjectId},
//     date: {type: String},
//     time: {type: String},
//     content: {type: String},
//     likes: {type: Array.from(likeSchema)}
// }

const PostSchema = new Schema({
    id: {type: ObjectId},
    userName: {type: String},
    userLastName: {type: String},
    userAvatar: {type: String},
    posts: {type: Array}
});

module.exports = model('Post', PostSchema);
