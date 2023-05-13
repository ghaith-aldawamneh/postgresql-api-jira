import { RequestHandler ,NextFunction} from 'express';

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

//other project //(3*=>Promise<any>)=>(1,2,3)=>{(3*Promise<any>.catch(next)}//at the end is void
//(RequestHandler/void/):RequestHandler/void/=>return Promise<any>=>{return(void) await requestHandler/that returns void/}

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next): Promise<any> => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      console.log("asyncCatch_file catchErrors func error:",error)
      next(error);
    }
  };
};
//:void=>return promise(return promise<any>)
export const catch_err = (requestHandler:AsyncFunction):any=>{
return async(req: Request, res: Response, next: NextFunction)=>
{ 
   return await requestHandler(req,res,next);

}}

export const catch_err2 = (requestHandler:RequestHandler):RequestHandler=>{
  return async (req,res,next):Promise<any>=>{
    try{
     return await requestHandler(req,res,next);
    }
     
    catch (error){
console.log("error")
next(error);
    }
  }
}


export const catchErrors2 = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      console.log("asyncCatch_file catchErrors func error:",error)
      next(error);
    }
  };
};

export const catchErrors3 = (requestHandler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
   
      return await requestHandler(req, res, next);
  };
};