const moment = require("moment");


const imageParams = (parentId, path, name) => {

    const dateNow = moment().unix()

    return {
        date: dateNow,
        parentId: parentId,
        id: name,
        path: path,
    }
}

module.exports = imageParams