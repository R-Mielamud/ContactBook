const { add, update, all, remove } = require("./category.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.get = async (user) => {
    try {
        const result = await all(user);

        return {
            categories: result
        };
    } catch (err) {
        return {
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
            category: result
        };
    } catch (err) {
        return {
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
            category: result
        };
    } catch (err) {
        return {
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
            category: result
        };
    } catch (err) {
        return {
            status: 400,
            category: null,
            message: __getErrorFormatted(err).message
        }
    }
};