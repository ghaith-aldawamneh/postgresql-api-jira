import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';


import createDatabaseConnection from 'database/createConnection';
import { addRespondToResponse } from 'middleware/response';
import { authenticateUser } from 'middleware/authentication';
import { handleError } from 'middleware/errors';
import { RouteNotFoundError } from 'errors';


import { attachPublicRoutes, attachPrivateRoutes } from './routes';


const establishDatabaseConnection = async (): Promise<void> => {
  try {
    console.log("ff123")
    await createDatabaseConnection();
    console.log("aaa123")
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));

  app.use(addRespondToResponse);

  attachPublicRoutes(app);

  app.use('/', authenticateUser);
  attachPrivateRoutes(app);



  app.use((req, _res, next) => 
  next(new RouteNotFoundError(req.originalUrl)));
  //extend customeErrors
  //{message,code,status,data: ErrorData = {}}(extrend Error{{name;message;stack?:;}})
  
  app.use(handleError);

  app.listen(process.env.PORT || 3000).on('error',(e) => console.log(e));
};

const initializeApp = async (): Promise<void> => {
  const headers={name1:'name1',name2:'name2'}
  for (const [key, value] of Object.entries(headers))
  {console.log("key,value:",key, value)}
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();