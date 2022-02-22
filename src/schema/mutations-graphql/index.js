const {GraphQLObjectType} = require("graphql");
const editProfile = require('./editProfile');
const editStatus = require('./editStatus');


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        editProfile,
        editStatus,
    }
})

module.exports = Mutation;
