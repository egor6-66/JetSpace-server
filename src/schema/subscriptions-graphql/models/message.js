const gql = require("graphql-tag");


const Message = gql`
    type Message {
        parentId: String
        id: String
        userId: String
        recipientId: String
        date: String
        type: String
        content: String
    }
`

module.exports = Message;
