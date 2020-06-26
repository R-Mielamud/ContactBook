const { add } = require("./image.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.register = async data => {
    try {
        const result = await add(data);

        return {
            success: true,
            image: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            image: null,
            message: __getErrorFormatted(err).message
        };
    }
};
