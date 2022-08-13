const { Customer } = require("../../view/Customer.js");
const { JWTPayload } = require("../../view/Authentication.js");

async function createCustomer(req, resp) {
  const { firstName, lastName, username, password, role } = req.body;
  console.log(username + "+++");
  if (
    firstName == null ||
    lastName == null ||
    username == null ||
    password == null
  ) {
    return resp.status(401).send("send all required parameters");
  }
  const tempCustomer = await Customer.createCustomer(
    firstName,
    lastName,
    username,
    password,
    role
  );
  console.log(tempCustomer);
  if (!tempCustomer) {
    return resp.status(401).send("Customer Already Exists");
  }
  resp.status(201).send(tempCustomer);
}
function withdrawMoney(req, resp) {
  const isValidCustomer = JWTPayload.isValidCustomer(req, resp);
  if (!isValidCustomer) {
    return "please login";
  }
  const username = req.params.username;
  const { amount, bankAbbre } = req.body;
  if (amount == null || bankAbbre == null || username == null) {
    return resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  // console.log(indexOfCustomer);
  if (!iscustomerexist) {
    return resp.status(200).send("customer doesnt exists");
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

  const amount = parseInt(req.body.amount);
  const bankAbbre = req.body.bankAbbre;
  if (amount == null || bankAbbre == null || username == null) {
    resp.status(400).send("send all required parameters");
  }
  let [indexOfCustomer, iscustomerexist] = Customer.findCustomer(username);
  if (!iscustomerexist) {
    resp.status(400).send("customer doesnt exists");
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
  const isValidAdmin = JWTPayload.isValidAdmin(req, resp);
  if (!isValidAdmin) {
    return "please login";
  }
  const { limit, pageNumber } = req.body;
  console.log(limit + "{}");
  console.log(pageNumber);
  if (Customer.allCustomers.length === 0) {
    return resp.status(400).send("No users yet");
  }
  let startIndex = (pageNumber - 1) * limit;
  let endIndex = pageNumber * limit;

  resp.status(200).send(Customer.allCustomers.slice(startIndex, endIndex));
}
module.exports = {
  createCustomer,
  depositMoney,
  withdrawMoney,
  transfer,
  selfTransfer,
  getAllCustomers,
};
