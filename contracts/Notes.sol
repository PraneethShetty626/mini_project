pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

contract Notes{
    mapping (address=>int[]) bpValues;
    mapping (address=>string[]) dates;

    function addBp(int val,string memory date) public{
            bpValues[msg.sender].push(val);
            dates[msg.sender].push(date);
    }


    function getBp() public view returns(int[] memory){
            return bpValues[msg.sender];
    }

    function getDate() public view returns(string[] memory) {
            return dates[msg.sender];
    }

} 