const gql = require("graphql-tag");


const UserTyping = gql`
    type UserTyping {
        userName: String
        myId: String
        userId: String
    }
`

module.exports = UserTyping;
