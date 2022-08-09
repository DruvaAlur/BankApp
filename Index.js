const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const { login } = require("./Controller/Login/Controller.js");
const { logout } = require("./Controller/Logout/Controller.js");
const { createBank, getAllBanks } = require("./Controller/Bank/Controller.js");
const {
  createNewAccount,
  getAllAccounts,
} = require("./Controller/Account/Controller.js");
const {
  createCustomer,
  depositMoney,
  withdrawMoney,
  transfer,
  selfTransfer,
  getAllCustomers,
} = require("./Controller/Customer/Controller.js");

app.use(cors());
app.use(bodyParser.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.post("/api/v1/createBank", (req, resp) => {
  createBank(req, resp);
});
app.post("/api/v1/login", async (req, resp) => {
  login(req, resp);
});

app.post("/api/v1/createCustomer", async (req, resp) => {
  createCustomer(req, resp);
});

app.post("/api/v1/createAccount/:username", (req, resp) => {
  createNewAccount(req, resp);
});
app.post("/api/v1/withdrawMoney/:username", (req, resp) => {
  withdrawMoney(req, resp);
});
app.post("/api/v1/depositMoney/:username", (req, resp) => {
  depositMoney(req, resp);
});
app.post("/api/v1/transfer/:username", (req, resp) => {
  transfer(req, resp);
});
app.post("/api/v1/selfTransfer/:username", (req, resp) => {
  selfTransfer(req, resp);
});
app.get("/api/v1/getAllCustomers", (req, resp) => {
  getAllCustomers(req, resp);
});
app.get("/api/v1/getAllAccounts/:username", (req, resp) => {
  getAllAccounts(req, resp);
});
app.get("/api/v1/getAllBanks", (req, resp) => {
  getAllBanks(req, resp);
});
app.post("/api/v1/logout", (req, resp) => {
  logout(req, resp);
});
app.listen(8800, () => {
  console.log("app started at port 8800");
});
// console.log("hi");
// let b1 = Bank.createBank("statebankofindia", "sbi");
// let b2 = Bank.createBank("bankofbaroda", "bob");

// // console.log(allBanks);
// let druva = Customer.createCustomer("Druva", "Alur");

// druva.createAccount("sbi");
// druva.createAccount("bob");
// let basu = Customer.createCustomer("basu", "m");
// basu.createAccount("sbi");
// druva.depositMoney(1000, "sbi");
// druva.transfer(1000, 2, "sbi", "sbi");
// console.log(druva);
// console.log(basu);
// druva.selfTransfer(1000, "sbi", "bob");
//druva.depositMoney(1000, "sbi");
// druva.withdrawMoney(500, "sbi");

// druva.depositMoney(1000, "sbi");
// console.log(druva);
// console.log(druva.accounts);
// druva.depositMoney(1000, "sbi");
// console.log(druva.accounts);
// // console.log(druvaAccount);
// // //console.log(druva.totalBalance);
// druva.updateTotalBalance(1999);
// // druvaAccount.withdrawMoney(1000, "sbi");
// console.log(druva);
