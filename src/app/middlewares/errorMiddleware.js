
export async function errorHandlerMiddleware(err, req, res, next) {
  //console.error(err);

  return res.status(err.status || 400).json({
    status: err.status,
    message: err.message,
    code: error.code
  });
}