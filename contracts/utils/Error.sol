// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Error {
    address public owner;
    error OwnerError(address givenAddress, address owner, string errText);
    error InsufficientLiquidity(uint available, uint amount, string errText);
    error InvalidAmount(uint min, uint max, uint amountIn, string errText);

    constructor() {
        owner = msg.sender;
    }

    function WrongOwner(address _givenAddress) internal view {
        revert OwnerError(_givenAddress, owner, "wrong owner!");
    }

    function invalidAmount(uint min, uint max, uint amount) internal pure {
        revert InvalidAmount(min, max, amount, "invalid amount");
    }
}
