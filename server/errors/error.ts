const errorHandler = (statusCode: number, message: string) => {
    const error = Error();
    error.statusCode = statusCode;
    error.message = message;

    return error;
}

// USE THIS ONE FOR AL CASES IN CONTROLLERS TO RETURN ERRORS next(errorHandler(...))

export default errorHandler;