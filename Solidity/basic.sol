// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Helloworld {
    string public greeting = "Hello world";
    uint public num = 30;
    string name = "Amit Gupta"; // cannot access from outside


    // function
    function changeValueOfNum(uint _num) public {
        num = _num;
    }

    string public mystatus = "Learning Solidity";

    function changeMyStatus(string memory _mystatus) public {
        mystatus = _mystatus;
    }

}