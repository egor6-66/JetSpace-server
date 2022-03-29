const gql = require("graphql-tag");


const Notification = gql`
    type Notification{
        id: ID,
        ownerId: String,
        userId: String,
        postId: String,
        action: String,
        content: String,
        contentDate: String,
    }
`
module.exports = Notification
