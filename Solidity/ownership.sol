// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TipJar {
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function sendTip() public payable {

    }

    address public owner;
    constructor(){
        owner = msg.sender;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only Owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    string name = "Amit Gupta";
    function changeName(string calldata _name) public payable {
        require(msg.value == 1 ether, "Amount should be One Ether");
        name = _name;
    
    }
}