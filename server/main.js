/* global Assets Meteor */

import solc from 'solc';
import web3 from '../imports/web3';

const source = Assets.getText('contract.sol');
const compiledContract = solc.compile(source, 1);
const { interface: api, bytecode } = compiledContract.contracts[':EtherBoard'];
const jsonApi = JSON.parse(api);

Meteor.methods({
  getContractInterface() {
    return JSON.parse(api);
  }
});

const createEtherboardViaContract = () => {
  const Contract = web3.eth.contract(jsonApi);
  const gasEstimate = web3.eth.estimateGas({ data: bytecode });

  return new Promise((resolve, reject) => {
    const contract = Contract.new({
      from: web3.eth.accounts[0],
      data: bytecode,
      gas: gasEstimate
    }, (err, res = {}) => {
      if (err) reject(err);
      else if (res.address) resolve(contract);
    });
  });
};

const getEtherboard = (address) => web3.eth.contract(jsonApi).at(address);

const getLeaders = (contract) => {
  const numLeaders = parseInt(contract.numLeaders().toString(10), 10);
  const leaders = [];
  for (let i = 1; i <= numLeaders; i += 1) {
    const leader = contract.getLeaderAtPosition.call(i);
    leaders.push({
      position: i,
      address: leader[0],
      amount: leader[1].toString(10),
      txt: leader[2],
      id: leader[3]
    });
  }
  return leaders;
};

// const etherBoard = getEtherboard(Meteor.settings.public.devContract);
// console.log(etherBoard.numLeaders().toString(10));
// const gas = etherBoard.addSelfToLeaderboard.estimateGas('its me');
// console.log(gas);
// etherBoard.addSelfToLeaderboard('its me', { from: web3.eth.accounts[0], gas, value: 2000007 });
// console.log(getLeaders(etherBoard));
// web3.eth.sendTransaction({ from: web3.eth.accounts[0], gas: 3000000, value: 100000000, to: '0x78347eBF38c26003Af2bB5dCB588F3953a7dFA64' });
/*const id = getLeaders(etherBoard)[1].id;
console.log(id);
const gasE = etherBoard.addAmountToLeader.estimateGas(id);
console.log(gasE);
etherBoard.addAmountToLeader(id, { from: web3.eth.accounts[0], gas: gasE * 2, value: 40033356 });
console.log(getLeaders(etherBoard));*/

/*createEtherboardViaContract()
.then(etherBoard => {
  etherBoard.LeaderboardChanged((err, event) => {
    if (err) console.log(err);
    else {
      const { args: { position, addr, amount, txt, id } } = event;
      console.log({
        position: position.toString(10),
        addr,
        amount: amount.toString(10),
        txt,
        id
      });
    }
  });

  /*for (let i = 0; i < 3; i += 1) {
    const gas = etherBoard.addSelfToLeaderboard.estimateGas('estimate');
    etherBoard.addSelfToLeaderboard('its me', { from: web3.eth.accounts[0], gas: gas * 2, value: 2000005 });
  }
  const id = getLeaders(etherBoard)[1].id;
  const gasE = etherBoard.addAmountToLeader.estimateGas(id);
  console.log(gasE);
  etherBoard.addAmountToLeader(id, { from: web3.eth.accounts[0], gas: gasE * 2, value: 123456 });
  console.log(getLeaders(etherBoard));
})
.catch(err => {
  console.log(err);
});*/

// const gas = etherBoard.addSelfToLeaderboard.estimateGas('its me');
// console.log(gas);
// etherBoard.addSelfToLeaderboard('its me', { from: web3.eth.accounts[0], gas: gas * 2, value: 2000005 });

/**
MAKE NEW CONTRACT
const source = Assets.getText('contract.sol');
const compiledContract = solc.compile(source, 1);
const { interface: abi, bytecode } = compiledContract.contracts[':EtherBoard'];
const Contract = web3.eth.contract(JSON.parse(abi));
const gasEstimate = web3.eth.estimateGas({ data: bytecode });
const myContractInstance = Contract.new({
  from: web3.eth.accounts[0],
  data: bytecode,
  gas: gasEstimate
});
console.log(myContractInstance.transactionHash);
console.log(myContractInstance.address);
*/

/**
ACCESS EXISTING CONTRACT
const source = Assets.getText('contract.sol');
const compiledContract = solc.compile(source, 1);
const { interface: abi } = compiledContract.contracts[':SimpleStorage'];
const Contract = web3.eth.contract(JSON.parse(abi));
const myContractInstance = Contract.at('0x0af1fe68b5daf2df5219f6c0c4be24cbd2a0df8e');
*/

/**
CALLING CONTRACT METHODS
const gas = myContractInstance.set.estimateGas(23);
myContractInstance.set(23, { from: web3.eth.accounts[0], gas: gas });
console.log(myContractInstance.get().toString(10));
*/
