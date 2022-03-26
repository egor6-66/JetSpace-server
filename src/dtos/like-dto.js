const LikeDto = (likeModel, userModel, post) => {
    likeModel.userName = userModel.name
    likeModel.userLastName = userModel.lastName
    likeModel.userAvatar = userModel.avatar
    likeModel.content = post.content
    likeModel.contentDate = post.date
    return likeModel
}

module.exports = LikeDto;
