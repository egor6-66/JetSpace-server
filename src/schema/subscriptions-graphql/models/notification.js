const gql = require("graphql-tag");


const Notification = gql`
    type Notification{
        parentId: ID
        id: ID
        date: String
        title: String
        content: String
        userId: ID
        userAvatar: String
    }
`
module.exports = Notification
