import jwt, { SignOptions } from 'jsonwebtoken';
import { isPlainObject } from 'lodash';

import { InvalidTokenError } from 'errors';


export const signToken = (payload: object, options?: SignOptions): string =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '180 days',
    ...options,
  });

export const verifyToken = (token: string): {[key: string]: any} => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (isPlainObject(payload)) {
      //console.log("payload:",payload,"typeof payload:",typeof payload);
      //const th = payload as { [key: string]: any };
      //console.log("ththth:",th,"typeof ththth:",typeof th);
      
      return payload as { [key: string]: any };
    }
    throw new Error();
  } catch (error) {
    throw new InvalidTokenError();
  }
};
