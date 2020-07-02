const { add, all, update, remove, byId, birthdays } = require("./contact.repository");
const { __getErrorFormatted } = require("../error.helper");
const { config, send } = require("../../email.helper");

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

exports.birthdays = async (tz, user) => {
    try {
        const result = await birthdays(tz, user);

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
};

exports.share = (express, user, email, id) => {
    try {
        const sendMail = () => send(express, {
            from: "Contact Book <noreply.contactbook.tk@gmail.com>",
            to: [email],
            subject: "Someone shared a contact with you! - Contact-Book.TK",
            html: `
                <center><h4>User ${user.email} would like to share a contact with you!</h4></center>
                <center><p><a href="${process.env.SITE_URL}/shared/${id}">See it!</a></p></center>
            `
        });

        if (!express.locals.configured) {
            config(express).then(() => {
                sendMail();
                express.locals.configured = true;
            });
        } else {
            sendMail();
        }

        return {
            success: true
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
