const { add } = require("./image.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.register = async data => {
    try {
        const result = await add(data);

        return {
            image: result
        };
    } catch (err) {
        return {
            status: 400,
            image: null,
            message: __getErrorFormatted(err).message
        };
    }
};
