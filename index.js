const express = require("express");
const https = require("https");
const fs = require("fs");
require("dotenv").config();
const connection = require("./mongo.add");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport.add");
const api = require("./api");
const path = require("path");
const { authenticateJWT } = require("./api/jwt.helper");

const server = express();

server.use(
    session({
        name: "session",
        saveUninitialized: false,
        resave: false,
        secret: process.env.SESSION_SECRET || "SecretKey1234567890",
        maxAge: 24 * 60 * 60 * 1000,
        store: new MongoStore({
            mongooseConnection: connection,
            stringify: false,
            collection: "session"
        })
    })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    if (process.env.NODE_ENV === "dev") {
        const { method, url } = req;
        console.log(`[${(new Date()).toUTCString()}] ${method} ${url}`);
    }

    next();
});

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

server.use(passport.initialize());
server.use(passport.session());
passport.config();
server.use("/docs", express.static(path.join(__dirname, "docs")));
server.use("/api", /* authenticateJWT(), */ api);

server.use((err, req, res, next) => {
    let e = { message: "" };
    
    if (err.joi || err.name === "MongoError") {
        e.message = err.message;
    } else {
        e = err;
    }

    if (err.name === "MongoError") {
        e.status = 500;
    }

    const status = e.status || 400;
    res.status(status).json(e);
});

const opts = process.env.USE_SSL ? {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
} : {};

module.exports = process.env.USE_SSL ? https.createServer(opts, server) : server;
