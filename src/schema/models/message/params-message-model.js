const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const messageParams = (args) => {
    const dateNow = moment().locale('ru').format('llll')

    return {
        id: uuidv4(),
        userId: args.myId,
        date: dateNow,
        content: args.content,
    }
}

module.exports = messageParams;
