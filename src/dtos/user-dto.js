const UserDto = (model) => {
    return {
        id: model.id,
        email: model.email,
        name: model.name,
        lastName: model.lastName,
        avatar: model.avatar,
        subscriptions:model.subscriptions,
        subscribers: model.subscribers,
        theme: model.theme,
        instagram: model.instagram,
        facebook: model.facebook,
        twitter: model.twitter,
        spotify: model.spotify,
        telegram: model.telegram,
        github: model.github,
        soundCloud: model.soundCloud,
        youTube: model.youTube,
        isActivated: model.isActivated,
    }
}

module.exports = UserDto;
