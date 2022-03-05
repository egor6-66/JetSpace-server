const MongooseToken = require('./token/mongoose-token-models');
const MongooseUser = require('./user/mongoose-user-model');
const MongoosePost = require('./post/mongoose-post-models');
const MongooseNotification = require('./notification/mongoose-notification-models');
const MongooseImage = require('./image/mongoose-image-models');
const MongooseLike = require('./like/mongoose-like-model');
const MongooseDislike = require('./dislike/mongoose-dislike-model')

const GraphQlUser = require('./user/graphql-user-model');
const GraphQlPost = require('./post/graphql-post-models');
const GraphQlNotification = require('./notification/graphql-notification-models');
const GraphQlImages = require('./image/graphql-image-models');
const GraphQlLike = require('./like/graphql-like-models')
const GraphQlDislike = require('./dislike/graphql-dislike-models')

const ParamsPost = require('./post/params-post-model');
const ParamsLike = require('./like/params-like-model');
const ParamsDislike = require('./dislike/params-dislike-model');

const MongooseModels = {
    Token: MongooseToken,
    User:MongooseUser,
    Post:MongoosePost,
    Notification:MongooseNotification,
    Image:MongooseImage,
    Like: MongooseLike,
    Dislike: MongooseDislike,
}

const GraphQlModels = {
    User:GraphQlUser,
    Post:GraphQlPost,
    Notification:GraphQlNotification,
    Image:GraphQlImages,
    Like: GraphQlLike,
    Dislike: GraphQlDislike,
}

const ParamsModels = {
    Post: ParamsPost,
    Like: ParamsLike,
    Dislike: ParamsDislike,
}

module.exports = {
    MongooseModels,
    GraphQlModels,
    ParamsModels,
};
