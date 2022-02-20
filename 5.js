// writing smart contracts

const Web3 = require("web3");
const dotenv = require("dotenv");
const abi = require("./abi/4.json");
const Tx = require("ethereumjs-tx").Transaction;
dotenv.config();

const url = process.env.ROPSTEN_INFURA_URL;
const web3 = new Web3(new Web3(url));

const account1 = "0x98575121203CA00725676C12d8D862bEC950f2fB";
const account2 = "0x3295B99072Ec49018386a68ec45dC090224384c3";

const contractAddress = "0xF172eD22158c111B1B8Db81b833bc7B8C91B2201";

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY1, "hex");

const dappTokenContract = new web3.eth.Contract(abi, contractAddress);

// Write data to smart contract

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const data = dappTokenContract.methods.transfer(account2, 1000).encodeABI(); // encoding abi
  // build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: contractAddress,
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    data,
  };

  // sign the txn
  const tx = new Tx(txObject, { chain: "ropsten" });

  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();

  const raw = "0x" + serializedTransaction.toString("hex");

  // broadcast the txn
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash", txHash);
  });
});
