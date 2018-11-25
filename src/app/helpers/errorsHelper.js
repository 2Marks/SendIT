
export class BaseError extends Error {

  constructor(message, status, code, info) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
    this.info   = info;
    this.code   = code;
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(message, info){
    super(message || 'Resource not found', 404, 'RESOURCE_NOT_FOUND');
  }
}

export class ResourceExistError extends BaseError {
  constructor(message, info){
    super(message || 'Resource already exists.', 409, 'RESOURCE_EXIST')
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor(message, info){
    super(message || 'Unprocessable Entity. Error during payload Validation.', 422, 'UNPROCESSABLE_ENTITY')
  } 
}

export class JoiValidationError extends BaseError {
  constructor(message, error){
    const errors =  error.details.map(err => {
      return {
        message: resolveMessage(err.message, err.path),
        path: err.path,
        type: err.type
      };
    });
    
    super(message || 'Error during request payload validation', 422, 'VALIDATION_ERROR', errors);
  }
}

function resolveMessage(message, path) {
  if(path.length > 1){
    return `${message} (${path.join('->')})`
  } 
  return message;
}