const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config();

const mainnetURL = process.env.INFURA_URL;
const web3 = new Web3(mainnetURL);

const abi = require("./abi/2.json");
const address = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(abi, address);

contract.getPastEvents(
  "Transfer", // filter by event name
  { fromBlock: 14234205, toBlock: "latest" }, // filter by block limits
  (err, events) => {
    console.log(events.length);
  }
);
