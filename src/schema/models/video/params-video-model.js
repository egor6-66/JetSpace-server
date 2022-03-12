const {v4: uuidv4} = require("uuid");


const videoParams = (args) => {

    return {
        id: uuidv4(),
        name: args.name,
        path: args.path,
    }
}

module.exports = videoParams;
