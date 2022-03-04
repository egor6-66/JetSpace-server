const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const paramsLikeModel = (userData, args) => {
    return {
        id: uuidv4(),
        date: moment().locale('ru').format('llll'),
        postId: args.postId,
        userId: args.userId,
        userName: userData.name,
        userLastName: userData.lastName,
        userAvatar: userData.avatar,
    }
}

module.exports = paramsLikeModel;
