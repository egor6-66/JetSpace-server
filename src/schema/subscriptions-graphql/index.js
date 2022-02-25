const gql = require('graphql-tag');
const {PubSub} = require('graphql-subscriptions');
const {makeExecutableSchema} = require('graphql-tools')


const pubSub = new PubSub();

const typeDefs = gql`
    type Query{
        getUserPosts: [Post]
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
    
    type Subscription{
        newPost: Post
        newLike: Like
    }
`

const resolvers = {
    Subscription: {
        newLike: {
            subscribe: () => pubSub.asyncIterator('newLike')
        },
        newPost: {
            subscribe: () => pubSub.asyncIterator('newPost')
        }
    }
}

exports.pubSub = pubSub;
exports.schema = makeExecutableSchema({typeDefs, resolvers});