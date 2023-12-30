// handleError

// const { logEvents } = require('./logEvents');

// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
//     console.error(err.stack)
//     res.status(500).send(err.message);
// }

// module.exports = errorHandler;


const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}


// OR ErrorHandler.js
// const ErrorHandler = (err, req, res, next) => {
//     console.log("Middleware Error Hadnling");
//     const errStatus = err.statusCode || 500;
//     const errMsg = err.message || 'Something went wrong';
//     res.status(errStatus).json({
//         success: false,
//         status: errStatus,
//         message: errMsg,
//         stack: process.env.NODE_ENV === 'development' ? err.stack : {}
//     })
// }

// export default ErrorHandler
