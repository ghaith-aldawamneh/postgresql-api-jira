
import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';


//import createDatabaseConnection from './database/createConnection';
import {dotenv_print} from './database/createConnection';
import { createConnection } from 'typeorm';



require('dotenv').config()

const establishDatabaseConnection = async () => {

    dotenv_print();
    console.log("createDatabaseConnection_before");
    //await createDatabaseConnection();
   

       await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Firefunfare1',
        database: 'jira_development',
        synchronize: true,
        logging: true,

      });
      console.log("createDatabaseConnection_after");
    
  //  await createConnection({
  //    type: 'postgres',
   //   host: process.env.DB_HOST,
   //   port: Number(process.env.DB_PORT),
   //   username: process.env.DB_USERNAME,
   //   password: process.env.DB_PASSWORD,
   //   database: process.env.DB_DATABASE,
   //   entities: Object.values(entities),
    //  synchronize: true,
    //});


};


const initializeApp = async (): Promise<void> => {
  console.log("before123")
   await establishDatabaseConnection();
  console.log("after123")

};

initializeApp();