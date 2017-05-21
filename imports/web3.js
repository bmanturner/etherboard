/* global web3 */

import Web3 from 'web3';

let provider;
if (typeof web3 !== 'undefined') {
  provider = web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider('http://localhost:8545');
}

export default new Web3(provider);
