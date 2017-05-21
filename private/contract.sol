pragma solidity ^0.4.11;

contract EtherBoard {
    address owner;
    uint public numLeaders;
    uint public maxLeaders;
    struct Leader {
      address addr;
      uint amount;
      string txt;
      bytes32 id;
    }
    mapping (uint => Leader) public leaders;
    event LeaderboardChanged(uint position, address addr, uint amount, string txt, bytes32 id);

    function EtherBoard() {
        owner = msg.sender;
        numLeaders = 0;
        maxLeaders = 12;
    }

    function getLeaderAtPosition(uint pos) returns (address addr, uint amount, string txt, bytes32 id) {
        require(pos > 0 && pos <= numLeaders);
        addr = leaders[pos].addr;
        amount = leaders[pos].amount;
        txt = leaders[pos].txt;
        id = leaders[pos].id;
    }

    function insertLeaderAtPosition(uint pos, Leader newLeader) internal {
        for (uint i = numLeaders; i >= pos; i--) leaders[i+1] = leaders[i];
        leaders[pos] = newLeader;
        if (numLeaders < maxLeaders) numLeaders++;
        LeaderboardChanged(pos, newLeader.addr, newLeader.amount, newLeader.txt, newLeader.id);
    }

    function addSelfToLeaderboard(string txt) payable {
        uint pos;
        for (uint i = 1; i <= numLeaders; i++) {
            if (msg.value > leaders[i].amount) {
                pos = i;
                break;
            }
        }
        if (pos == 0 && numLeaders < maxLeaders) pos = numLeaders + 1;
        require(pos > 0);
        insertLeaderAtPosition(pos, Leader({ addr: msg.sender, amount: msg.value, txt: txt, id: sha3(msg.data, block.number) }));
    }

    function addAmountToLeader(bytes32 _id) payable {
        Leader memory changed;
        bool found = false;

        for (uint i = numLeaders; i > 0; i--) {
          if (leaders[i].id == _id) {
            changed = leaders[i];
            changed.amount += msg.value;
            for (uint j = i; j < numLeaders; j++) leaders[j] = leaders[j + 1];
            numLeaders -= 1;
            found = true;
            break;
          }
        }

        require(found);
        uint pos;
        for (uint k = 1; k <= numLeaders; k++) {
            if (changed.amount > leaders[k].amount) {
                pos = k;
                break;
            }
        }
        if (pos == 0 && numLeaders < maxLeaders) pos = numLeaders + 1;
        require(pos > 0);
        insertLeaderAtPosition(pos, changed);
    }

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    function withdraw(uint amount) onlyOwner {
        owner.transfer(amount);
    }

    function setMaxLeaders(uint newMax) onlyOwner {
        maxLeaders = newMax;
    }

    function kill() onlyOwner {
        selfdestruct(owner);
    }
}
