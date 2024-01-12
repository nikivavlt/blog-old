const ApiError = require('../error/ApiError');
const { logEvents } = require('./logEvents');

const errorMiddleware = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
//   logEvents(`${err.name}: ${err.message}`, 'errLog.txt');

  const error = ApiError.internal('Unexpected error.');
  return res.status(error.code).json({ message: error.message });
};

export default errorMiddleware;
