const { add, all, update, remove, byId, birthdays } = require("./contact.repository");
const { __getErrorFormatted } = require("../error.helper");

exports.register = async (data) => {
    try {
        const result = await add(data);

        return {
            success: true,
            contact: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            contact: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.birthdays = async user => {
    try {
        const result = await birthdays(user);

        return {
            success: true,
            contacts: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            contacts: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.byId = async id => {
    try {
        const result = await byId(id);

        if (!result) {
            return {
                success: false,
                status: 404,
                contact: null
            };
        }

        return {
            success: true,
            contact: result
        };
    } catch (err) {
        return {
            success: false,
            status: 404,
            contact: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.get = async (user, filter, min = false) => {
    try {
        const result = await all(user, filter, min);

        return {
            success: true,
            contacts: result
        };
    } catch (err) {
        return {
            success: false,
            status: 404,
            contacts: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.alter = async (userID, id, data) => {
    try {
        const result = await update(userID, id, data);

        return {
            success: true,
            contact: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            contacts: null,
            message: __getErrorFormatted(err).message
        }
    }
};

exports.remove = async (userID, id) => {
    try {
        const result = await remove(userID, id);

        return {
            success: true,
            contact: result
        };
    } catch (err) {
        return {
            success: false,
            status: 400,
            contacts: null,
            message: __getErrorFormatted(err).message
        }
    }
}