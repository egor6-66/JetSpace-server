const {v4: uuidv4} = require("uuid");
const moment = require("moment");
const {GraphQLString} = require("graphql");


const paramsCommentModel = (user,args) => {

    const dateNow = moment().unix()

    return {
        id: uuidv4(),
        date: dateNow,
        postId: args.postId,
        userId: args.userId,
        content: args.content,
        userName: user.name,
        userLastName: user.lastName,
        userAvatar: user.avatar,
    }
}

module.exports = paramsCommentModel;
