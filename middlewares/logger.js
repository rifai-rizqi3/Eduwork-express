const log = (req, res, next) => {
    console.log(new Date().toLocaleDateString(), '=>', req.method, req.originalUrl, req.original);
    next();
}

module.exports = log;