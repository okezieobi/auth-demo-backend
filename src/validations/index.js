import { validationResult, checkSchema } from 'express-validator';

import UserSchema from './user';
import jwt from '../utils/jwt';

const handleValidationErr = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status: 400 });
};

const decodeJwt = async ({ headers }, res, next) => {
  await jwt.verify(headers)
    .then(({ _id }) => {
      res.locals.userId = _id;
      next();
    }).catch(next);
};

const userSchema = new UserSchema(checkSchema);

export default {
  user: {
    signup: [userSchema.validateSignup, handleValidationErr],
    login: [userSchema.validateLogin, handleValidationErr],
    jwt: [userSchema.validateJWT, handleValidationErr, decodeJwt],
  },
};
