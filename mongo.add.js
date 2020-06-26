const mongoose = require("mongoose");

mongoose.connect((process.env.NODE_ENV !== "test"
                    ? process.env.MONGO_URI
                    : process.env.MONGO_URI_TEST) || "mongodb://localhost:27017/contact-book", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
    console.error("Mongo error: " + err);
    process.exit(1);
});

mongoose.set("debug", process.env.NODE_ENV === "dev");

module.exports = mongoose.connection;
