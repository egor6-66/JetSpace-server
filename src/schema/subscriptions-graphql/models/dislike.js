const gql = require("graphql-tag");


const Dislike = gql`
    type Dislike {
        id: String
        postId: String
        userId: String
        userName: String
        userLastName: String
        userAvatar: String
    }
`

module.exports = Dislike;
