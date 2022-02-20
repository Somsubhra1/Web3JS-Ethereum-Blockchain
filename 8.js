// web3js utilities

const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config();

const mainnetURL = process.env.INFURA_URL;
const web3 = new Web3(mainnetURL);

// Get gas price
web3.eth.getGasPrice().then((result) => {
  console.log("Gas price:", web3.utils.fromWei(result, "ether"));
});

// Hash function
console.log("Hash", web3.utils.sha3("123"));
console.log("Hash", web3.utils.keccak256("123")); // keccak256 is alias of sha3

console.log("Solidity Hash", web3.utils.soliditySha3("123"));

// Generate random hex
console.log("Random Hex", web3.utils.randomHex(32));
