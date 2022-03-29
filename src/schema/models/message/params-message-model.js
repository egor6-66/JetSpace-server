const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const messageParams = (args) => {

    const dateNow = moment().unix()

    return {
        id: uuidv4(),
        userId: args.myId,
        recipientId: args.userId,
        date: dateNow,
        type: args.type,
        content: args.content,
    }
}

module.exports = messageParams;
