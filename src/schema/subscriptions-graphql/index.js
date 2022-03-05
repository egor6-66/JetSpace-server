const gql = require('graphql-tag');
const {PubSub} = require('graphql-subscriptions');
const {makeExecutableSchema} = require('graphql-tools');
const {Post, Dislike, Like, Notification} = require('./models')


const pubSub = new PubSub();

const typeDefs = gql`
    ${Dislike}
    ${Like}
    ${Post}
    ${Notification}

    type Query{
        getUserPosts: [Post]
        getNotification: [Notification]
    }

    type Subscription{
        newPost: Post
        newLike: Like
        newDislike: Dislike
        newNotification: Notification
    }
`

const resolvers = {
    Subscription: {
        newLike: {
            subscribe: () => pubSub.asyncIterator('newLike')
        },
        newDislike: {
            subscribe: () => pubSub.asyncIterator('newDislike')
        },
        newPost: {
            subscribe: () => pubSub.asyncIterator('newPost')
        },
        newNotification: {
            subscribe: () => pubSub.asyncIterator('newNotification')
        }
    }
}

exports.pubSub = pubSub;
exports.schema = makeExecutableSchema({typeDefs, resolvers});