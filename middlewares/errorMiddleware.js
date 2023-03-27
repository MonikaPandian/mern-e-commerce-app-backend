const errorHandler = (err, req, res, next) => {

    res.status(err.status || 500);
    res.send({
        error: err.status || 500,
        message: err.message
    });
}

module.exports = { errorHandler };