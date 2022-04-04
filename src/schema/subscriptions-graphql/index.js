const gql = require('graphql-tag');
const {PubSub} = require('graphql-subscriptions');
const {withFilter} = require('graphql-subscriptions');
const {makeExecutableSchema} = require('graphql-tools');
const {Post, Dislike, Like, Notification, Message, Comment, UserTyping} = require('./models')
const pubSub = new PubSub();


const typeDefs = gql`
    ${Dislike}
    ${Comment}
    ${Like}
    ${Post}
    ${Notification}
    ${Message}
    ${UserTyping}

    type Query{
        getUserPosts: [Post]
        getNotification: [Notification]
        getMessages: [Message]
    }

    type Subscription{
        newPost(id: String): Post
        newLike: Like
        newDislike: Dislike
        newNotification(myId: ID): Notification
        newMessage(userId: String, myId: String): Message
        userTypingSub(userId: String, myId: String): UserTyping
        newComment: Comment
    }
`

const resolvers = {
    Subscription: {
        newComment: {
            subscribe: () => pubSub.asyncIterator('newComment')
        },
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
            subscribe: withFilter(
                () => pubSub.asyncIterator('newNotification'),
                (payload, variables) => {
                    return (payload.newNotification.ownerId === variables.myId)
                }
            )
        },
        newMessage: {
            subscribe: withFilter(
                () => pubSub.asyncIterator('newMessage'),
                (payload, variables) => {
                    return (
                        variables.userId === payload.newMessage.userId &&
                        variables.myId === payload.newMessage.recipientId
                    )
                }
            )
        },
        userTypingSub: {
            subscribe: withFilter(
                () => pubSub.asyncIterator('userTypingSub'),
                (payload, variables) => {
                    return (
                        variables.myId === payload.userTypingSub.userId &&
                        variables.userId === payload.userTypingSub.myId
                    )
                }
            )
        }
    },
}

exports.pubSub = pubSub;
exports.schema = makeExecutableSchema({typeDefs, resolvers});