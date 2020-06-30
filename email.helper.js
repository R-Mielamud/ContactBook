const nodemailer = require("nodemailer");

exports.config = express => {
    return new Promise(resolve => {
        express.locals.emailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        resolve();
    });
};

exports.send = (express, { from, to, subject, html }) => {
    const { emailTransporter: transport } = express.locals;

    transport.sendMail({
        from,
        to,
        subject,
        html
    }, (err, info) => {
        if (err) console.error(err);
    });
};
