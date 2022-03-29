const MongooseToken = require('./token/mongoose-token-models');
const MongooseUser = require('./user/mongoose-user-model');
const MongoosePost = require('./post/mongoose-post-models');
const MongooseImage = require('./image/mongoose-image-models');
const MongooseMessage = require('./message/mongoose-message-models');
const MongooseSound = require('./sound/mongoose-sound-models');
const MongooseVideo = require('./video/mongoose-video-models');

const GraphQlUser = require('./user/graphql-user-model');
const GraphQlPost = require('./post/graphql-post-models');
const GraphQlNotification = require('./notification/graphql-notification-models');
const NotificationsSubType = require('./notification/graphql-notification-sub-model');
const GraphQlImages = require('./image/graphql-image-models');
const GraphQlLike = require('./like/graphql-like-models');
const GraphQlAllLikes = require('./like/graphql-all-like-models');
const GraphQlDislike = require('./dislike/graphql-dislike-models');
const GraphQlAllDislikes = require('./dislike/graphql-all-dislike-models');
const GraphQlMessage = require('./message/graphql-message-models');
const GraphQlDialogs = require('./message/graphql-dialogs-model');
const GraphQlSound = require('./sound/graphql-sound-models');
const GraphQlVideo = require('./video/graphql-video-models');
const GraphQlComment = require('./comment/graphql-comment-models')
const GraphQlFollowers = require('./followers/graphql-followers-models')

const ParamsPost = require('./post/params-post-model');
const ParamsLike = require('./like/params-like-model');
const ParamsDislike = require('./dislike/params-dislike-model');
const ParamsMessage = require('./message/params-message-model');
const ParamsImage = require('./image/params-image-model');
const ParamsSound = require('./sound/params-sound-model');
const ParamsVideo = require('./video/params-video-model');
const ParamsComment = require('./comment/params-comment-model');
const notificationParams = require('./notification/params-notification-model');

const MongooseModels = {
    Token: MongooseToken,
    User:MongooseUser,
    Post:MongoosePost,
    Image:MongooseImage,
    Message: MongooseMessage,
    Sound: MongooseSound,
    Video: MongooseVideo,
}

const GraphQlModels = {
    User:GraphQlUser,
    Post:GraphQlPost,
    Notification:GraphQlNotification,
    NotificationSub: NotificationsSubType,
    Image:GraphQlImages,
    Like: GraphQlLike,
    AllLikes: GraphQlAllLikes,
    Dislike: GraphQlDislike,
    AllDislikes: GraphQlAllDislikes,
    Message: GraphQlMessage,
    Dialogs: GraphQlDialogs,
    Sound: GraphQlSound,
    Video: GraphQlVideo,
    Comment: GraphQlComment,
    Followers: GraphQlFollowers,
}

const ParamsModels = {
    Post: ParamsPost,
    Like: ParamsLike,
    Dislike: ParamsDislike,
    Message: ParamsMessage,
    Image: ParamsImage,
    Sound: ParamsSound,
    Video: ParamsVideo,
    Comment: ParamsComment,
    Notification: notificationParams,
}

module.exports = {
    MongooseModels,
    GraphQlModels,
    ParamsModels,
};
