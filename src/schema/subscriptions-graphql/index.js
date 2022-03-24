const gql = require('graphql-tag');
const {PubSub} = require('graphql-subscriptions');
const { withFilter } = require('graphql-subscriptions') ;
const {makeExecutableSchema} = require('graphql-tools');
const {Post, Dislike, Like, Notification, Message} = require('./models')
const pubSub = new PubSub();


const typeDefs = gql`
    ${Dislike}
    ${Like}
    ${Post}
    ${Notification}
    ${Message}

    type Query{
        getUserPosts: [Post]
        getNotification: [Notification]
        getMessages: [Message]
    }

    type Subscription{
        newPost(id: String): Post
        newLike: Like
        newDislike: Dislike
        newNotification: Notification
        newMessage: Message
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
            subscribe: withFilter(
                () => pubSub.asyncIterator('newPost'),
                (payload, variables) => {
                    return (payload.newPost.userId === variables.id)
                }
            )
        },
        newNotification: {
            subscribe: () => pubSub.asyncIterator('newNotification')
        },
        newMessage: {
            subscribe: () => pubSub.asyncIterator('newMessage')
        },
    }
}

exports.pubSub = pubSub;
exports.schema = makeExecutableSchema({typeDefs, resolvers});