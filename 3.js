// Ethereum transactions

const Web3 = require("web3");
const dotenv = require("dotenv");
const Tx = require("ethereumjs-tx").Transaction;
dotenv.config();

const url = process.env.ROPSTEN_INFURA_URL;

const web3 = new Web3(new Web3(url));

const account1 = "0x98575121203CA00725676C12d8D862bEC950f2fB";
const account2 = "0x3295B99072Ec49018386a68ec45dC090224384c3";

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY1, "hex"); // converting private key to hex format

web3.eth.getBalance(account1, (err, balance) => {
  console.log("-----------GET BALANCE-------------");

  console.log("account1 Balance", web3.utils.fromWei(balance, "ether")); // convert to subsequent units
});

web3.eth.getBalance(account2, (err, balance) => {
  console.log("-----------GET BALANCE-------------");

  console.log("account2 Balance", web3.utils.fromWei(balance, "ether")); // convert to subsequent units
});

// send transaction unsigned
// web3.eth.sendTransaction(
//   {
//     from: account1,
//     to: account2,
//     value: web3.utils.toWei("1", "ether"),
//   },
//   (err, result) => {
//     console.log(err);
//     console.log(result);
//   }
// );

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount), // previous transaction count
    to: account2, // receiving account
    value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")), // amount to transfer
    gasLimit: web3.utils.toHex(21000), // this is the maximum amount of gas consumed by the transaction.
    gasPrice: web3.utils.toHex(web3.utils.toWei("1", "gwei")), // this is the amount we want to pay for each unit of gas.

    // gas is basically the price we pay to the miners for the transaction to take place.
  };

  // sign the txn
  const tx = new Tx(txObject, { chain: "ropsten" }); // specify the blockchain here. in production use mainnet

  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();

  const raw = "0x" + serializedTransaction.toString("hex");

  // broadcast the txn
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash", txHash);
  });
});
