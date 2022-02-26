const gql = require("graphql-tag");


const Like = gql`
  type Like {
        id: String
        postId: String
        userId: String
        userName: String
        userLastName: String
        userAvatar: String
    }
`

module.exports = Like;
