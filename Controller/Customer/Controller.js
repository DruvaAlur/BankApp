const { Customer } = require("../../view/Customer.js");
const { JWTPayload } = require("../../view/Authentication.js");

async function createCustomer(req, resp) {
  const { firstName, lastName, username, password } = req.body;
  if (
    firstName == null ||
    lastName == null ||
    username == null ||
    password == null
  ) {
    resp.status(200).send("send all required parameters");
  }
  resp
    .status(200)
    .send(
      await Customer.createCustomer(firstName, lastName, username, password)
    );
}
function withdrawMoney(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { amount, bankAbbre } = req.body;
  if (amount == null || bankAbbre == null || username == null) {
    resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  // console.log(indexOfCustomer);
  if (!iscustomerexist) {
    resp.status(200).send("customer doesnt exists");
  }
  // console.log(indexOfCustomer);
  // console.log(amount);
  // console.log(bankAbbre);
  // console.log(Customer.allCustomers[indexOfCustomer]);
  resp
    .status(200)
    .send(
      "updated balance=" +
        Customer.allCustomers[indexOfCustomer].withdrawMoney(amount, bankAbbre)
    );
  console.log(amount, bankAbbre);
}
function depositMoney(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { amount, bankAbbre } = req.body;
  if (amount == null || bankAbbre == null || username == null) {
    resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(200).send("customer doesnt exists");
  }
  console.log(indexOfCustomer);
  resp
    .status(200)
    .send(
      "updated balance=" +
        Customer.allCustomers[indexOfCustomer].depositMoney(amount, bankAbbre)
    );
}
function transfer(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { amount, creditCustomerusername, creditBankAbbre, debitBankAbbre } =
    req.body;
  if (
    amount == null ||
    creditBankAbbre == null ||
    username == null ||
    creditCustomerusername == null ||
    debitBankAbbre == null
  ) {
    resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(200).send("customer doesnt exists");
  }
  // console.log(indexOfCustomer);

  resp
    .status(200)
    .send(
      Customer.allCustomers[indexOfCustomer].transfer(
        amount,
        creditCustomerusername,
        creditBankAbbre,
        debitBankAbbre
      )
    );
}
function selfTransfer(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { amount, creditCustomerId, creditBankAbbre, debitBankAbbre } =
    req.body;
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(200).send("customer doesnt exists");
  }
  // console.log(indexOfCustomer);

  resp.status(200).send(
    Customer.allCustomers[indexOfCustomer].selfTransfer(
      amount,

      creditBankAbbre,
      debitBankAbbre
    )
  );
}
function getAllCustomers(req, resp) {
  resp.status(200).send(Customer.getAllCustomers());
}
module.exports = {
  createCustomer,
  depositMoney,
  withdrawMoney,
  transfer,
  selfTransfer,
  getAllCustomers,
};
