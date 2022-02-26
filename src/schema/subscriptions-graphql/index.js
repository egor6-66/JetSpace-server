const gql = require('graphql-tag');
const {PubSub} = require('graphql-subscriptions');
const {makeExecutableSchema} = require('graphql-tools')


const pubSub = new PubSub();

const typeDefs = gql`
    type Query{
        getUserPosts: [Post]
        getNotification: [Notification]
    }
    type Like {
        id: String
        postId: String
        userId: String
        userName: String
        userLastName: String
        userAvatar: String
    }
 
    type Post{
        id: ID
        date: String
        time: String
        content: String
        likes: [Like]
    }
    
    type Notification{
        id: ID
        title: String
        content: String
        userId: ID
        userAvatar: String
    }

    type Subscription{
        newPost: Post
        newLike: Like
        newNotification: Notification
    }
`

const resolvers = {
    Subscription: {
        newLike: {
            subscribe: () => pubSub.asyncIterator('newLike')
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