const { Customer } = require("../../view/Customer.js");
const { JWTPayload } = require("../../view/Authentication.js");
const { Credential } = require("../../view/Credential.js");
async function login(req, resp) {
  const { username, password } = req.body;
  if (password == null || username == null) {
    resp.status(200).send("send all required parameters");
  }
  let [indexOfCustomer, isCustomerExists] = Customer.findCustomer(username);

  if (
    !isCustomerExists ||
    !(await Credential.comparePassword(
      password,
      Customer.allCustomers[indexOfCustomer].credential.password
    ))
  ) {
    resp.status(504).send("Invalid Credentials");
    return;
  }
  const newPayload = new JWTPayload(Customer.allCustomers[indexOfCustomer]);
  const newToken = newPayload.createToken();
  resp.cookie("myToken", newToken);
  resp.status(200).send(Customer.allCustomers[indexOfCustomer]);
}
module.exports = { login };
