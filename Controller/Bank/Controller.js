const { Bank } = require("../../view/Bank.js");

function createBank(req, resp) {
  const { bankName, bankAbbre } = req.body;
  if (bankName == null || bankAbbre == null) {
    resp.status(200).send("send all required parameters");
  }
  resp.status(200).send(Bank.createBank(bankName, bankAbbre));
}
function getAllBanks(req, resp) {
  resp.status(200).send(Bank.getAllBanks());
}
module.exports = { createBank, getAllBanks };
