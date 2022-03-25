const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const messageParams = (args, userData) => {

    const dateNow = moment().unix()

    return {
        id: uuidv4(),
        userId: args.myId,
        date: dateNow,
        type: args.type,
        content: args.content,
    }
}

module.exports = messageParams;
