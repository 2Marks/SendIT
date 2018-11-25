import {UnprocessableEntityError} from './errorsHelper';

export async function APIHelper (req, res, controller, expectPayload = true) {
  try {
    //TODO: validates for object entry only
    if(typeof req.body!="undefined" && Array.isArray(req.body)){
      throw new UnprocessableEntityError("Request body must be of type object");
    }

    const payload = Object.assign({}, req.body, req.params, req.query);

    if(Object.keys(payload).length <= 0 && expectPayload){
      throw new UnprocessableEntityError('No payload sent');
    } 

    const {data, message} = await controller(payload);

    return res.json({
      status: 200,
      message,
      data : data ? data : [] 
    });
  } 
  catch (error) {
    console.error(error);

    return res.status(error.status || 400).json({
      status: error.status,
      message: error.message,
      code: error.code,
      errors: error.info
    });
  }
}