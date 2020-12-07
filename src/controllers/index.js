import services from '../services';
import UserController from './user';

const user = new UserController(services);

export default {
  user,
};
