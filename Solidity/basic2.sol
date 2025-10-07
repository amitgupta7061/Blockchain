// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Basic{
    uint num = 30;

    function checking() public view returns(uint){
        return num;
    }

    function updateNumber(uint _num) public {
        require(num < _num, "Number can't be set too low value");
        num = _num;
    }

    function hitlist() public pure returns(uint){
        return 100;
    }

    function sum(uint nums) public pure returns (uint){
        uint total = 0;
        for(uint i = 1; i <= nums; i++){
            total += i;
        }
        return total;
    }

    function guess(uint _myguess) public pure returns(string memory){
        if(_myguess == 7){
            return "You guessed correctly";
        } else if(_myguess < 7){
            return "Too low Try again!";
        } else {
            return "Too high Try again!";
        }
    }

// store owner info 
    address public owner;
    constructor(){
        owner = msg.sender;
    }

    modifier ownership(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    string public name = "Amit Gupta";

    function setName(string memory _name) public ownership {
        name = _name;
    }

}

