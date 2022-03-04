const {
    Schema,
    model,
} = require('mongoose');


const DislikeSchema = new Schema({
    userId: {type: String},
    dislikes: {type: Array}
});

module.exports = model('dislike', DislikeSchema);
