
// SPDX-License-Identifier: UNLICENSED


// pragma experimental ABIEncoderV2;
pragma solidity >0.4.1;

contract Todo{
    uint public count=0;
    mapping(uint=>Task) public todolist;

    struct Task{
        uint id;
        string content;
        bool completed;

    }
    constructor() {
        addTask("First Task");
    }

    function  addTask(string memory _content) public  {
        // require(msg.sender==);
        todolist[count++]=Task(count,_content,false);
    }

    function gettask(uint id) public view returns( string memory){
        Task memory ret=todolist[id];
        return ret.content; 
    }

    function gettasklist() public view returns(string[] memory){
        string[] memory res;
        for(uint256 i=0;i<count-1;i++){
            string memory t=todolist[i].content;
            res[i]=t;
        }
        return res;
    }

}

