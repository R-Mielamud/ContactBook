const { add, getByEmail, update } = require("./user.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.register = async (data) => {
    try {
        const user = await add(data);

        return {
            success: true,
            user: user
        }
    } catch (err) {
        return {
            success: false,
            status: 400,
            user: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.update = async (id, data) => {
    try {
        const user = await update(id, data);

        return {
            success: true,
            user: user
        }
    } catch (err) {
        return {
            success: false,
            status: 400,
            user: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.exists = async email => {
    try {
        const user = await getByEmail(email);

        return {
            success: true,
            exists: user ? true : false
        }
    } catch (err) {
        return {
            success: false,
            status: 400,
            exists: false,
            message: __getErrorFormatted(err).message
        }
    }
};
