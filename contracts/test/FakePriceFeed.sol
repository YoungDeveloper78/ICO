pragma solidity ^0.8.0;

// SPDX-License-Identifier: MIT
contract FakePriceFeed {
    function latestRoundData()
        external
        pure
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        roundId = 0;
        startedAt = 0;
        updatedAt = 0;
        answeredInRound = 0;
        answer = 288810000000;
    }
}
