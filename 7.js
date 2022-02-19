const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config();

const mainnetURL = process.env.INFURA_URL;
const web3 = new Web3(mainnetURL);

web3.eth.getBlockNumber().then(console.log); // get latest block number

// get block details
// can specify string, block number or block hash as param
web3.eth.getBlock(14235114).then((block) => {
  //   console.log({ blockHash: block.hash, blockNumber: block.number });
});

web3.eth.getBlockNumber().then((latest) => {
  for (let i = 0; i < 10; i++) {
    web3.eth.getBlock(latest - i).then((block) => {
      //   console.log(block.hash);
    });
  }
});

// web3.eth.getBlock("latest").then(console.log);

// Transaction count
web3.eth.getBlockTransactionCount("latest").then(console.log);

const blockHash =
  "0x315bb7574a1e3f2dff2fb68d88e1729506ded3f65151bed5009e0e203ee1aa36";

web3.eth.getTransactionFromBlock(blockHash, 2).then(console.log); // getTransactionFromBlock takes block hash and index of the transaction inside block to fetch. index starts from 0
