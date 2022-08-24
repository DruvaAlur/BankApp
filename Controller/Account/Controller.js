const { Customer } = require("../../view/Customer.js");
const { Bank } = require("../../view/Bank.js");
const { JWTPayload } = require("../../view/Authentication.js");

function createNewAccount(req, resp) {
  console.log("_____________________________");
  console.log(Customer.allCustomers);
  console.log(Bank.allBanks);
  const isValidAdmin = JWTPayload.isValidAdmin(req, resp);
  if (!isValidAdmin) {
    return "please login";
  }

  const { username, bankAbbre } = req.body;
  console.log(username, bankAbbre);
  if (username == null || bankAbbre == null) {
    return resp.status(401).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    return resp.status(401).send("customer doesnt exists");
  }
  console.log(indexOfCustomer);
  const tempAcc =
    Customer.allCustomers[indexOfCustomer].createAccount(bankAbbre);
  if (!tempAcc) {
    return resp.status(401).send("Account already exists");
  }
  console.log(tempAcc);
  resp.status(200).send(tempAcc);
}
function getAllAccounts(req, resp) {
  // const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  // if (!isValidCustomer) {
  //   return "please login";
  // }
  const username = req.params.username;
  const { amount, creditCustomerId, creditBankAbbre, debitBankAbbre } =
    req.body;
  if (username == null) {
    resp.status(401).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(401).send("customer doesnt exists");
  }
  // console.log(indexOfCustomer);

  resp
    .status(201)
    .send(Customer.allCustomers[indexOfCustomer].getAllAccounts());
}
module.exports = { createNewAccount, getAllAccounts };
