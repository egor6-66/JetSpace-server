const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const paramsLikeModel = (args) => {

    const dateNow = moment().unix()

    return {
        id: uuidv4(),
        date: dateNow,
        postId: args.postId,
        userId: args.userId,
    }
}

module.exports = paramsLikeModel;
