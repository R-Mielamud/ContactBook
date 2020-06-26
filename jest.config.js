const path = require("path");

module.exports = {
    "testEnvironment": "node",
    "testMatch": [
        path.join(__dirname, "api", "**", "*.test.js")
    ]
};
