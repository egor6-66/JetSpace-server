const gql = require("graphql-tag");


const Post = gql`
    type Post{
        parentId: ID
        id: ID
        date: String
        time: String
        content: String
        likes: [Like]
    }
`

module.exports = Post;
