import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';

import { CustomError } from 'errors';




export const handleError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  console.log("errorerror",error)
  const isErrorSafeForClient = error instanceof CustomError;
  console.log("isErrorSafeForClient",isErrorSafeForClient)
  const clientError = isErrorSafeForClient?
     pick(error, ['message', 'code', 'status', 'data'])
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };
  console.log("clientErrorclientError:",clientError)
  res.status(clientError.status).send({ error: clientError });
};


