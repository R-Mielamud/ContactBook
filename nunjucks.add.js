const nunjucks = require("nunjucks");
const path = require("path");

nunjucks.conf = exp => {
    nunjucks.configure(path.join(__dirname, "templates"), {
        watch: true,
        autoescape: true,
        express: exp
    });
};

module.exports = nunjucks;
