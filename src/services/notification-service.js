const {MongooseModels} = require('../schema/models')
const {pubSub} = require("../schema/subscriptions-graphql");
const {v4: uuidv4} = require("uuid");
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

        const notificationsData = await MongooseModels.Notification.findOne({userId: ownerId})
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
                const newNotifications = await MongooseModels.Notification.create({userId: ownerId,})
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
            const postsData = await MongooseModels.Post.findOne({userId: ownerId})
            const postData = postsData.posts.find((post) => post.id === payload.postId)
            return postData.content
        }
    }
}

const validators = new Validators()


module.exports = new NotificationService();

