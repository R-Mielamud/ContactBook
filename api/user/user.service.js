const { add, getByEmail, update } = require("./user.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.register = async (data) => {
    try {
        const user = await add(data);

        return {
            user: user
        }
    } catch (err) {
        return {
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
            user: user
        }
    } catch (err) {
        return {
            status: 400,
            user: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.profile = async email => {
    try {
        const user = await getByEmail(email);

        if (!user) {
            throw {
                message: "Not authorized"
            }
        }

        return {
            user: user
        }
    } catch (err) {
        return {
            status: 400,
            user: null,
            message: __getErrorFormatted(err).message
        }
    }
};
