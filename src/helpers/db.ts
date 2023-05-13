import {Connection, createConnection, getConnection} from "typeorm";
import ORMConfig from "../ormconfig";
require('dotenv').config()

export const DBConnect = async () => {

  try {

      console.log('ORMConfig',ORMConfig)
      await createConnection(ORMConfig);
      console.log('after ORMConfig',ORMConfig)
 
    console.log("🌴 Database connection was successful!");
  } catch (e) {
    console.error('ERROR: Database connection failed!!', e);
    throw e;
  }
};

export const TryDBConnect = async (onError: Function, next?: Function) => {
  try {
    console.log("db file TryDBConnect")
    await DBConnect();
    if (next) {
      next();
    }
  } catch (e) {
    onError();
  }
};

