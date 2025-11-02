// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./interface.sol";

contract SodaPrice is IsodaPrice{
    address public owner;
    uint public price;

    constructor(uint _price){
        price = _price;
        owner = msg.sender;
    }

    function getPrice() external view returns(uint){
        return price;
    }

    function setPrice(uint _price) public {
        require(msg.sender == owner);
        price = _price;
    }

}
