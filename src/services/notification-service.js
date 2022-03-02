const {v4: uuidv4} = require("uuid");
const MongooseNotification = require("../schema/models/notification/mongoose-notification-models");
const MongoosePost = require('../schema/models/post/mongoose-post-models');
const {pubSub} = require("../schema/subscriptions-graphql");
const moment = require("moment");


const notificationParams = (parentId, dateNow, title, content, userId, payload) => {
    return {
        parentId: parentId,
        id: uuidv4(),
        date: dateNow,
        title: title,
        content: content,
        userId: userId,
        userAvatar: payload.userAvatar
    }
}

class NotificationService {

    async addNotification(ownerId, userId, payload, action) {

        const notificationsData = await MongooseNotification.findOne({userId: ownerId})
        const title = await validators.getTitle(action, payload)
        const content = await validators.getContent(ownerId, payload)

        if (ownerId !== userId) {
            const dateNow = moment().locale('ru').format('llll')
            if (notificationsData) {
                notificationsData.notifications.unshift(
                    notificationParams(notificationsData._id, dateNow, title, content, userId, payload))
                await notificationsData.save()
                await pubSub.publish('newNotification', {newNotification: notificationsData.notifications[0]})
            } else {
                const newNotifications = await MongooseNotification.create({userId: ownerId,})
                newNotifications.notifications.unshift(
                    notificationParams(newNotifications._id, dateNow, title, content, userId, payload)
                )
                await newNotifications.save()
                await pubSub.publish('newNotification', {newNotification: newNotifications.notifications[0]})
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

