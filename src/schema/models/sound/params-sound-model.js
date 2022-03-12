const {v4: uuidv4} = require("uuid");


const soundParams = (args) => {

    return {
        id: uuidv4(),
        path: args.path,
        type: args.type
    }
}

module.exports = soundParams;