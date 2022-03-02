const {
    Schema,
    model,
} = require('mongoose');


const allLikesSchema = new Schema({
    userId: {type: String},
    likes: {type: Array}
});

module.exports = model('allLike', allLikesSchema);
