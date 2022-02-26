const gql = require("graphql-tag");
const {v4: uuidv4} = require("uuid");


const Notification = gql`
    type Notification{
        parentId: ID
        id: ID
        date: String
        time: String
        title: String
        content: String
        userId: ID
        userAvatar: String
    }
`
module.exports = Notification
