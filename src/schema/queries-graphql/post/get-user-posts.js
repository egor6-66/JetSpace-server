const {GraphQLID} = require("graphql");
const GraphQlPosts = require('../../models/post/graphql-post-models');
const MongoosePosts = require('../../models/post/mongoose-post-models');

const getUserPosts = {
    type: GraphQlPosts,
    args: {userId: {type: GraphQLID}},
    resolve(parent, args) {
        console.log('getUserPosts',args)
        return MongoosePosts.findOne({id: args.userId})
    }
};

module.exports = getUserPosts;
