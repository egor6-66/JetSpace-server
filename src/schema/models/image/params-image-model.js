const {v4: uuidv4} = require("uuid");


const imageParams = (parentId, path) => {
    return {
        parentId: parentId,
        id: uuidv4(),
        path: path,
    }
}

module.exports = imageParams