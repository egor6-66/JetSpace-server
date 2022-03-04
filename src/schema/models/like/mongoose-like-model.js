const {
    Schema,
    model,
} = require('mongoose');


const LikeSchema = new Schema({
    userId: {type: String},
    likes: {type: Array}
});

module.exports = model('like', LikeSchema);
