const { Customer } = require("../../view/Customer.js");
const { JWTPayload } = require("../../view/Authentication.js");

function createNewAccount(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { bankAbbre } = req.body;
  if (username == null || bankAbbre == null) {
    resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(200).send("customer doesnt exists");
  }
  console.log(indexOfCustomer);
  resp
    .status(200)
    .send(Customer.allCustomers[indexOfCustomer].createAccount(bankAbbre));
}
function getAllAccounts(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { amount, creditCustomerId, creditBankAbbre, debitBankAbbre } =
    req.body;
  if (username == null) {
    resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(200).send("customer doesnt exists");
  }
  // console.log(indexOfCustomer);

  resp
    .status(200)
    .send(Customer.allCustomers[indexOfCustomer].getAllAccounts());
}
module.exports = { createNewAccount, getAllAccounts };