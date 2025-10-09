// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./interface.sol";

contract vendingMachine {
    uint sodaCnt; 
    address owner;
    IsodaPrice public sodaAddress;

    constructor(uint num, address _sodaAddress) {
        sodaCnt = num;
        owner = msg.sender;
        sodaAddress = IsodaPrice(_sodaAddress);
    }

    modifier ownership(){
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    struct CustomerDetails{
        uint purchasedCnt;
        uint timestamp;
        bool isVip;
    }

    mapping (address => CustomerDetails) public purchasedList; 

    function buy() public payable {
        require(msg.value == sodaAddress.getPrice(), "You should have 1 ether");
        require(sodaCnt > 0, "Out of Stock");
        
        CustomerDetails storage customer = purchasedList[msg.sender];

        customer.purchasedCnt += 1;
        customer.timestamp = block.timestamp;
        if(customer.purchasedCnt == 10) customer.isVip = true;

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