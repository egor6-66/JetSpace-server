const {v4: uuidv4} = require("uuid");

const FollowersDto = (followerModel, userModel) => {
    followerModel.id = uuidv4()
    followerModel.userId = userModel.id
    followerModel.userName = userModel.name
    followerModel.userLastName = userModel.lastName
    followerModel.userAvatar = userModel.avatar
    return followerModel

}

module.exports = FollowersDto;
