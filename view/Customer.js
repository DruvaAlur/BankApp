const uuid = require("uuid");
const { Bank } = require("./Bank.js");
const { Accounts } = require("./Account.js");
const { Credential } = require("./Credential.js");
class Customer {
  static allCustomers = [];

  constructor(firstName, lastName, credential, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.customerId = uuid.v4();
    this.totalBalance = 0;
    this.accounts = [];
    this.credential = credential;
    this.role = role;
  }
  static async createCustomer(firstName, lastName, username, password, role) {
    const [flag, message, newCredential] = Credential.createCredential(
      username,
      password
    );
    if (!flag) {
      return false;
    }
    newCredential.password = await newCredential.getHashOfPassword();

    let newCustomer = new Customer(firstName, lastName, newCredential, role);
    Customer.allCustomers.push(newCustomer);
    console.log(newCustomer);
    return newCustomer;
  }
  // static async createAdmin(firstName, lastName, username, password) {
  //   const [flag, message, newCredential] = Credential.createCredential(
  //     username,
  //     password
  //   );
  //   newCredential.password = await newCredential.getHashOfPassword();
  //   if (!flag) {
  //     return message;
  //   }
  //   let newCustomer = new Customer(firstName, lastName, newCredential);
  //   this.allCustomers.push(newCustomer);
  //   return newCustomer;
  // }

  static findCustomer(username) {
    // console.log(Customer.allCustomers[0]);
    for (let index = 0; index < Customer.allCustomers.length; index++) {
      // console.log(Customer.allCustomers[index].credential.username);
      if (Customer.allCustomers[index].credential.username == username) {
        return [index, true];
      }
    }
    console.log("Customer not Exists");
    return [null, false];
  }
  static findCustomerByUsername(username) {
    for (let index = 0; index < Customer.allCustomers.length; index++) {
      const customer = Customer.allCustomers[index];
      if (customer.credential.username == username) {
        return [index, true];
      }
    }
    console.log("Customer not Exists");
    return [null, false];
  }

  createAccount(bankAbbre) {
    if (!Bank.isBankExist(bankAbbre)) {
      return false;
    }
    let [index, isAccountExists] = this.isAccountExists(bankAbbre);
    if (isAccountExists) {
      return false;
    }
    let bank = Bank.findBank(bankAbbre);

    let newAccount = new Accounts(bank);

    this.accounts.push(newAccount);
    return newAccount;
  }

  isAccountExists(bankAbbre) {
    // console.log(this);
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].isAccountExists(bankAbbre)) {
        return [i, true];
      }
    }
    return [null, false];
  }

  depositMoney(ammount, bankAbbre) {
    let [indexofaccount, isAccountExist] = this.isAccountExists(bankAbbre);
    if (!isAccountExist) {
      console.log("account doesnt exists");
      return;
    }
    // if (this.accounts[indexofaccount].balance < ammount) {
    //   console.log("Not Sufficient Balance");
    //   return false;
    // }

    this.accounts[indexofaccount].balance += ammount;
    this.updateTotalBalance(ammount);
    return this.accounts[indexofaccount].balance;
  }

  withdrawMoney(amount, bankAbrre) {
    // console.log(amount, bankAbrre);
    let [accountIndex, isAccountexist] = this.isAccountExists(bankAbrre);

    if (isAccountexist == false) return "Acccount Doesnt Exists";
    console.log(this.accounts[accountIndex].balance);
    console.log(amount);
    if (this.accounts[accountIndex].balance < amount) {
      return "Not Sufficient Balance";
    }
    this.accounts[accountIndex].balance -= amount;
    this.updateTotalBalance();
    return this.accounts[accountIndex].balance;
  }

  updateTotalBalance() {
    this.totalBalance = 0;
    for (let i = 0; i < this.accounts.length; i++) {
      this.totalBalance += this.accounts[i].balance;
    }
  }

  transfer(amount, creditCustomerusername, creditBankAbbre, debitBankAbbre) {
    console.log(this);
    let [debitaccountindex, isdebitAccountExist] =
      this.isAccountExists(debitBankAbbre);
    if (!isdebitAccountExist) {
      return "debit account doesnt exists";
    }
    if (this.accounts[debitaccountindex].balance < amount) {
      console.log();
      return "Not Sufficient Balance";
    }
    console.log(creditCustomerusername);
    let [creditcustomerindex, iscustomerexist] = Customer.findCustomer(
      creditCustomerusername
    );
    // console.log(creditCustomerId);
    if (!iscustomerexist) {
      return "credit customer doesnt exists";
    }
    let [creditaccountindex, iscreditaccountexist] =
      Customer.allCustomers[creditcustomerindex].isAccountExists(
        creditBankAbbre
      );
    if (!iscreditaccountexist) {
      return "credit account doesnt exists";
    }
    this.withdrawMoney(amount, debitBankAbbre);
    Customer.allCustomers[creditcustomerindex].depositMoney(
      amount,
      creditBankAbbre
    );
    return "transfer success";
  }

  selfTransfer(ammount, debitBankAbbre, creditBankAbbre) {
    this.transfer(ammount, this.customerId, creditBankAbbre, debitBankAbbre);
    return "self transfer sucess";
  }

  static getAllCustomers() {
    return Customer.allCustomers;
  }

  getAllAccounts() {
    return this.accounts;
  }
}
module.exports = { Customer };
