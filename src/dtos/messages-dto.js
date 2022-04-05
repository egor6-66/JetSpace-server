const MessagesDto = (messagesModel, userModel, newMessages) => {
    messagesModel.newMessages = newMessages
    messagesModel.userName = userModel.name
    messagesModel.userLastName = userModel.lastName
    messagesModel.userAvatar = userModel.avatar

    return messagesModel
}

module.exports = MessagesDto;
