const gql = require("graphql-tag");


const Comment = gql`
    type Comment {
        id: String,
        date: String,
        postId: String,
        userId: String,
        content: String,
        userName: String,
        userLastName: String,
        userAvatar: String,
    }
`

module.exports = Comment;
