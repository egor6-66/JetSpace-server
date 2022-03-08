const gql = require("graphql-tag");


const Message = gql`
    type Message {
        parentId: String
        id: String
        userId: String
        date: String
        content: String
    }
`

module.exports = Message;
