const jwt = require("jsonwebtoken");
class JWTPayload {
  static secratekey = "strongPassword";
  constructor(customer) {
    this.username = customer.credential.username;
  }
  createToken() {
    return jwt.sign(JSON.stringify(this), JWTPayload.secratekey);
  }
  static verifyCookie(token) {
    return jwt.verify(token, JWTPayload.secratekey);
  }
  static isValidCustomer(req, resp) {
    const myToken = req.cookies["myToken"];
    // console.log(myToken);
    if (!myToken) {
      resp.status(504).send("Login required");
      return false;
    }
    const newPayload = JWTPayload.verifyCookie(myToken);
    if (newPayload.username != req.params.username) {
      resp.status(401).send("unauthorized access");
      return false;
    }

    // const newPayload = JWTPayload.verifyCookie(myToken);
    // if (!newPayload.isActive) {
    //   resp.status(504).send("user not active");
    //   return false;
    // }
    return true;
  }
}
module.exports = { JWTPayload };
