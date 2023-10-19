// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

contract Counter{
    uint public count;

    constructor(uint _initalCount){
        count = _initalCount;
    }

    function increment() public returns (uint newCount) {
        count++;
        return count;
    }

    function decrement() public returns(uint newCOunt) {
        count--;
        return count;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}