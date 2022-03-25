const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const postParams = (args) => {

    const dateNow = moment().unix()

    return {
        id: uuidv4(),
        userId: args.userId,
        date: dateNow,
        content: args.content,
        likes: [],
        dislikes: [],
        comments: []
    }
}

module.exports = postParams;
