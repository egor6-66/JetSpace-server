class UserDto {
    id;
    email;
    name;
    lastName;
    isActivated;

    constructor(model) {
        this.id = model._id;
        this.email = model.email;
        this.name = model.name;
        this.lastName = model.lastName;
        this.isActivated = model.isActivated;
    }
}

module.exports = UserDto;
