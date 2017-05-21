export default [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "bytes32"
      }
    ],
    "name": "addAmountToLeader",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "pos",
        "type": "uint256"
      }
    ],
    "name": "getLeaderAtPosition",
    "outputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "txt",
        "type": "string"
      },
      {
        "name": "id",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "txt",
        "type": "string"
      }
    ],
    "name": "addSelfToLeaderboard",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "numLeaders",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newMax",
        "type": "uint256"
      }
    ],
    "name": "setMaxLeaders",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "maxLeaders",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "leaders",
    "outputs": [
      {
        "name": "addr",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "txt",
        "type": "string"
      },
      {
        "name": "id",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "position",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "addr",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "txt",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "id",
        "type": "bytes32"
      }
    ],
    "name": "LeaderboardChanged",
    "type": "event"
  }
];
