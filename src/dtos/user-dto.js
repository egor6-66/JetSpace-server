class UserDto {
    id;
    email;
    name;
    lastName;
    theme;
    instagram
    facebook
    twitter
    spotify
    telegram
    github
    soundCloud
    youTube
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.lastName = model.lastName;
        this.theme = model.theme;
        this.instagram = model.instagram;
        this.facebook = model.facebook;
        this.twitter = model.twitter;
        this.spotify = model.spotify;
        this.telegram = model.telegram;
        this.github = model.github;
        this.soundCloud = model.soundCloud;
        this.youTube = model.youTube;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;
