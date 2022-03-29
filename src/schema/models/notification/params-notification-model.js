const {v4: uuidv4} = require("uuid");
const moment = require("moment");


const notificationParams = (args, action, element) => {

    const dateNow = moment().unix()

    return {
        id: uuidv4(),
        date: dateNow,
        ownerId: args.ownerId,
        userId: args.userId,
        action: action,
        content: element.content,
        contentDate: element.date,
    }
}

module.exports = notificationParams;
