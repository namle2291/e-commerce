const notFoundHandler = (req, res, next)=>{
    const err = new Error(`Route ${req.originalUrl} not found!`);
    res.status(404)
    next(err);
}

const errorHandler = (err, req, res, next) => {
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
    })
}

module.exports = {notFoundHandler,errorHandler};