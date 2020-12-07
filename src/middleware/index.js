import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';

const user = new UserMiddleware(validations, controllers);

export default {
  user,
};
