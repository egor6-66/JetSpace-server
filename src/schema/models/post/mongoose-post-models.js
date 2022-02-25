const {
    Schema,
    model,
    ObjectId,
} = require('mongoose');


const PostSchema = new Schema({
    userId: {type: String},
    posts: {type: Array}
});

module.exports = model('Post', PostSchema);
