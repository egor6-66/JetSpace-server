const {Schema, model, ObjectId} = require('mongoose');


const SoundSchema = new Schema({
    userId: {type: String},
    soundTracks: {type: Array},
    playLists: {type: Array},
});

module.exports = model('Sound', SoundSchema);
