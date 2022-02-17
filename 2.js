const Web3 = require("web3");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.INFURA_URL;
const contractAddress = process.env.CONTRACT_ADDRESS;

// ABI - Application Binary Interface
const abi = require("./abi/2.json");

const web3 = new Web3(new Web3(url));

// Get contract
let contract = new web3.eth.Contract(abi, contractAddress);

// console.log(contract);

// Get methods
// console.log(contract.methods);
// Get methods name
// console.log(contract.methods.name);

// Get name
contract.methods.name().call((err, result) => {
  console.log("Name", result);
});

// get symbol
contract.methods.symbol().call((err, result) => {
  console.log("symbol", result);
});

// Total supply
contract.methods.totalSupply().call((err, result) => {
  console.log("total supply", result);
});

// Minting finished
contract.methods.mintingFinished().call((err, result) => {
  console.log("Minting finished? ", result);
});

// Balance of

let accountAddress = "0x23735750a6ed0119e778d9bb969137df8cc8c3d1";
contract.methods.balanceOf(accountAddress).call((err, result) => {
  console.log("Balance of", result);
});
