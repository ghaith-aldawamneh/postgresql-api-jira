import { createConnection, Connection } from 'typeorm';

import * as entities from '../entities';
export const dotenv_print = ():void=>{
  console.log("process.env.DB_USERNAME",process.env.DB_USERNAME);
};


const createDatabaseConnection = (): Promise<Connection> =>
  createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Object.values(entities),
    synchronize: true,
  });


export default createDatabaseConnection;
