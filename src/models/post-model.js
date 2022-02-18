const {Schema, model} = require('mongoose');


const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String},
    content: {type: String},
});

module.exports = model('Post', PostSchema);
