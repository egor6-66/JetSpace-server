const gql = require("graphql-tag");


const Post = gql`
    type Post{
        id: ID
        userId: ID
        date: String
        time: String
        content: String
        likes: [Like]
        dislikes: [Dislike]
        comments: [Comment]
    }
`

module.exports = Post;
