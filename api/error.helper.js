exports.__getErrorFormatted = err => {
    let e = { message: "" };
    
    if (err.joi || err.name === "MongoError") {
        e.message = err.message;
    } else {
        e = Object.create(err);
    }

    return e;
}