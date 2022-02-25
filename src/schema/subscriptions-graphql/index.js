const gql = require('graphql-tag');
const {PubSub} = require('graphql-subscriptions');
const {makeExecutableSchema} = require('graphql-tools')


const pubSub = new PubSub();

const typeDefs = gql`
    type Query{
        getUserPosts: [Post]
    }
    type like {
        id: String
        name: String
        lastName: String
    }

    type Post{
        id: ID
        date: String
        time: String
        content: String,
        likes: [like]
    }

#    type Posts {
#        id: String
#        posts:[post]
#    }
    type Subscription{
        newPost: Post,
    }
`

const resolvers = {
    Subscription: {
        newPost: {
            subscribe: () => pubSub.asyncIterator('newPost')
        }
    }
}

exports.pubSub = pubSub;
exports.schema = makeExecutableSchema({typeDefs, resolvers});