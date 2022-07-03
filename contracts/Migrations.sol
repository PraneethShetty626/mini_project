pragma solidity >=0.4.21 <0.7.0;

contract Migrations {
  address public admin;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == admin) _;
  }

  constructor() public {
    admin = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
