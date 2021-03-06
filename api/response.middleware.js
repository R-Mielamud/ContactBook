module.exports = (req, res, next) => {
    if (req.query.redirectTo) {
        res.redirect(req.query.redirectTo);
    } else {
        if (!res.data.message) {
            res.json(res.data);
        } else {
            next(res.data);
        }
    }
};
