import { RequestHandler } from 'express';

export const addRespondToResponse: RequestHandler = 

(_req, res, next) => {
  res.respond = (data): void => {
    console.log("data_addRespondToResponse",data);
    res.status(200).send(data);
  };
  next();
};
