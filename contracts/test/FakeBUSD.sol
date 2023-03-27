// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FakeBUSD is Ownable, ERC20("Binance USD", "BUSD") {
    constructor(uint value) {
        _mint(owner(), value * 10 ** decimals());
    }

    function mint(
        uint256 amount,
        address account
    ) external onlyOwner returns (bool) {
        _mint(account, amount * 1e18);
        return true;
    }
}
