const NotificationsDto = (notificationModel, userModel) => {
    notificationModel.userName = userModel.name
    notificationModel.userLastName = userModel.lastName
    notificationModel.userAvatar = userModel.avatar

    return notificationModel
}

module.exports = NotificationsDto;
