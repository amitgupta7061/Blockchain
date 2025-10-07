// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract vendingMachine {
    uint sodaCnt; 
    address owner;

    constructor(uint num) {
        sodaCnt = num;
        owner = msg.sender;
    }

    modifier ownership(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function buy() public payable {
        require(msg.value == 1 ether, "You should have 1 ether");
        require(sodaCnt > 0, "Out of Stock");
        sodaCnt -= 1;
    }

    function fillSodaCnt(uint _sodaCnt) public ownership {
        sodaCnt += _sodaCnt;
    }

    function withdraw() public ownership {
        payable(owner).transfer(address(this).balance);
    }

    function getSodaCnt() public view ownership returns (uint) {
        return sodaCnt;
    }


}