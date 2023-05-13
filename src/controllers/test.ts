import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import resetTestDatabase from 'database/resetDatabase';
import createTestAccount from 'database/createTestAccount';
import {RequestHandler} from 'express'
export const resetDatabase:RequestHandler 
= catchErrors(async (_req, res) => {
  await resetTestDatabase();
  res.respond(true);
});

export const createAccount:RequestHandler
= catchErrors(async (_req, res) => {
  const user = await createTestAccount();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});
