// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Lottery {
 address public manager;
address payable [] public players;
   constructor()  {
      manager=msg.sender;

  }
  function enter() public payable{
      require(msg.value > 1 ether);

      players.push(payable(msg.sender));
  }
  function getBalance() public view returns (uint) {
        return address(this).balance;
    }
  function random() public view returns(uint)
  {
     return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
  }
      function pickWinner() public restricted {
        uint index = random() % players.length;
        address contractAddress = address(this);
        players[index].transfer(contractAddress.balance);
        players = new address payable[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
   function getPlayers() public view returns(address payable[] memory)
   {
       return players;
   }
}
