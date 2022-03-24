const UserDto = (model) => {
    return {
        id: model.id,
        email: model.email,
        name: model.name,
        lastName: model.lastName,
        theme: model.theme,
        isActivated: model.isActivated,
    }
}

module.exports = UserDto;
