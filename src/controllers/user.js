import jwt from '../utils/jwt';
export default class UserController {
  constructor({ user }) {
    this.services = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
  }

  async signup({ body }, res, next) {
    await this.services.create(body)
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async login({ body }, res, next) {
    await this.services.auth({ user: body.user, password: body.password })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async findById(req, res, next) {
    await this.services.authJWT(res.locals.userId).then((data) => {
      if (data.message) throw data;
      else next();
    }).catch(next);
  }

  async encodeJWT(req, res, next) {
    res.locals.data.token =  await jwt.generate(res.locals.data.user);
    res.set('token', res.locals.data.token);
    next();
  }

  async decodeJWT({ headers }, res, next) {
    await jwt.verify(headers)
    .then(({ _id }) => {
      res.locals.userId = _id;
      next();
    }).catch(next);
  }
}
