const {v4: uuidv4} = require("uuid");
const MongooseNotification = require("../schema/models/notification/mongoose-notification-models");
const MongoosePost = require('../schema/models/post/mongoose-post-models');
const {pubSub} = require("../schema/subscriptions-graphql");


class NotificationService {

    async addNotification(ownerId, userId, payload, action) {
        const notificationsData = await MongooseNotification.findOne({userId: ownerId})
        const title = await validators.getTitle(action, payload)
        const content = await validators.getContent(ownerId, payload)

        if (ownerId !== userId) {
            if (notificationsData) {
                notificationsData.notifications.unshift({
                    id: uuidv4(),
                    title: title,
                    content: content,
                    userId: userId,
                    userAvatar: payload.userAvatar
                })
               await notificationsData.save()
                await pubSub.publish('newNotification', {newNotification: notificationsData.notifications[0]})
            } else {
                await MongooseNotification.create({
                    userId: ownerId,
                    notifications: [{
                        id: uuidv4(),
                        title: title,
                        content: content,
                        userId: userId,
                        userAvatar: payload.userAvatar
                    }],
                })
                await pubSub.publish('newNotification', {newNotification: notificationsData.notifications[0]})
            }
        }
    }
}

class Validators {

    async getTitle(action, payload) {
        if (action === 'addLikePost') return `${payload.userName} ${payload.userLastName} оценил вашу запись`
    }

    async getContent(ownerId, payload) {
        if (payload.postId) {
            const postsData = await MongoosePost.findOne({userId: ownerId})
            const postData = postsData.posts.find((post) => post.id === payload.postId)
            return postData.content
        }
    }
}
const validators = new Validators()


module.exports = new NotificationService();

