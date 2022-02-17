const Web3 = require("web3");
const dotenv = require("dotenv");
// console.log(Web3);

dotenv.config();

const url = process.env.INFURA_URL;
const address = process.env.CONTRACT_ADDRESS;

// create connection to blockchain
// const web3 = new Web3(new Web3(url));
const web3 = new Web3(new Web3.providers.HttpProvider(url));

// get a balance from account
web3.eth.getBalance(address, (err, balance) => {
  console.log("-----------GET BALANCE-------------");
  console.log(balance); // gives in wei

  console.log(web3.utils.fromWei(balance, "ether")); // convert to subsequent units
});

console.log("---------------CREATE ACCOUNT------------");
// create account
console.log(web3.eth.accounts.create());
