const uuid = require("uuid");
const bcrypt = require("bcrypt");
class Credential {
  static allCredentials = [];
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.credentialId = uuid.v4();
  }
  static findUser(username) {
    console.log(Credential.allCredentials.length);
    for (let index = 0; index < Credential.allCredentials.length; index++) {
      if (Credential.allCredentials[index].username == username) {
        return [true, index];
      }
    }
    return [false, -1];
  }
  async getHashOfPassword() {
    return bcrypt.hash(this.password, 10);
  }
  static async comparePassword(password, encyptedPassword) {
    return await bcrypt.compare(password, encyptedPassword);
  }
  static createCredential(username, password) {
    let [isUserExists, indexOfUser] = Credential.findUser(username);
    if (isUserExists) {
      return [false, "userName Already Exist", null];
    }
    let newCredential = new Credential(username, password);
    Credential.allCredentials.push(newCredential);
    return [true, "Credential Created", newCredential];
  }
}
module.exports = { Credential };
