class UserDto {
    id;
    email;
    name;
    lastName;
    theme;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.lastName = model.lastName;
        this.theme = model.theme;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;
