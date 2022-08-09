const uuid = require("uuid");
class Accounts {
  static accountNo = 1;
  static allAccounts = [];
  constructor(bank) {
    this.bank = bank;
    this.accountNo = Accounts.accountNo++;
    this.balance = 1000;
    this.accountId = uuid.v4();
  }
  isAccountExists(bankAbbre) {
    if (this.bank.bankAbbre == bankAbbre) {
      return true;
    }
    return false;
  }
}
module.exports = { Accounts };
