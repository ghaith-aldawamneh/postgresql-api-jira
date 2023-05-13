import { RequestHandler } from 'express';

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next): Promise<any> => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const catch_Errors=(requestHandler:RequestHandler):RequestHandler=>
{
  return async (req,res,next):Promise<any>=>{
     try
     {
   return await requestHandler(req,res,next);
     }
     catch(error){
         next(error);
     }
  }

}


