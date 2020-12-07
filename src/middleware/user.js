export default class UserMiddleWare {
  constructor(validations, controllers) {
    this.signup = [...validations.user.signup, controllers.user.signup, controllers.user.encodeJWT];
    this.login = [...validations.user.login, controllers.user.login, controllers.user.encodeJWT];
    this.jwt = [...validations.user.jwt, controllers.user.decodeJWT, controllers.user.findById];
  }
}
