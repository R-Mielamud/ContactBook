const server = require("./index");

const port = process.env.PORT || 3000;

server.listen(port, "", () => {
    console.log(`Server started on 127.0.0.1:${port}`);
});
