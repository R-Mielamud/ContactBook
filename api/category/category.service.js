const { add, update, all, remove } = require("./category.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.get = async (user) => {
    try {
        const result = await all(user);

        return {
            success: true,
            categories: result
        };
    } catch (err) {
        return {
            success: false,
            status: 404,
            categories: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.alter = async (userID, id, data) => {
    try {
        const result = await update(userID, id, data);

        return {
            success: true,
            category: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            category: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.register = async (data) => {
    try {
        const result = await add(data);

        return {
            success: true,
            category: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            category: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.remove = async (userID, id) => {
    try {
        const result = await remove(userID, id);

        return {
            success: true,
            category: {
                state: "deleted"
            }
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            category: null,
            message: __getErrorFormatted(err).message
        }
    }
};