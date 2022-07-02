pragma solidity >=0.4.21 <0.7.0;

contract Migrations {
  address public Admin;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == Admin) _;
  }

  constructor() public {
    Admin = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
