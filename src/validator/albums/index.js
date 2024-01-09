const InvariantError = require("../../exceptions/InvariantError");
const { Album } = require("./schema")

const AlbumValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = Album.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = AlbumValidator;