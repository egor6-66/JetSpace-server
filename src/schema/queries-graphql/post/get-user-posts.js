const {GraphQLID} = require("graphql");
const GraphQlPost = require('../../models/post/graphql-post-models');
const MongoosePost = require('../../models/post/mongoose-post-models');

const getUserPosts = {
    type: GraphQlPost,
    args: {userId: {type: GraphQLID}},
    async resolve(parent, args) {
        const postData = await MongoosePost.findOne({userId: args.userId})
        return postData
    }
};

module.exports = getUserPosts;
