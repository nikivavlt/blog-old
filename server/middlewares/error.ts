// const ApiError = require('../error/ApiError');
// const { logEvents } = require('./logEvents');

// module.exports = function (err, req, res, next) {
//   if (err instanceof ApiError) {
//     return res.status(err.status).json({ message: err.message });
//   }
//   logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
//   return res.status(500).json({ message: 'Unexpected error.' });
// };

// export default ErrorHandler
