// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./utils/Error.sol";
import "./utils/ChainlinkOracle.sol";

pragma solidity ^0.8.7;

contract ICO is ChainlinkOracle, Error, ReentrancyGuard {
    using SafeMath for uint256;
    uint public totalIndex;
    IERC20 public qst_token;
    uint public totalSupply;
    uint public totalInflation;
    uint public curentInflation;
    uint public priceOfSingleToken; //USD$
    uint public InflationPersent;
    uint public Minimum;
    uint public Maximum;
    uint public holdersCount;
    mapping(address => uint) public eachPersonId;

    struct Holder {
        address user;
        uint amount;
        uint time;
        uint value;
    }
    mapping(uint => Holder) public holderInfo;
    mapping(uint => Holder) public itemInfo;

    constructor(address _token) {
        qst_token = IERC20(_token);

        totalInflation = 50000000e18;
        priceOfSingleToken = 0.000005 * 1e18;
        Minimum = 10000000 * 10 ** 18;
        Maximum = 400000000 * 10 ** 18;
        InflationPersent = 5;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) WrongOwner(msg.sender);
        _;
    }

    modifier AtLeast(uint amount, address sender) {
        uint index = eachPersonId[sender];
        uint receivedAmount = holderInfo[index].amount;
        uint realAmount = amount + receivedAmount;
        if (realAmount < Minimum || realAmount > Maximum)
            invalidAmount(Minimum, Maximum, realAmount);
        _;
    }

    function addToken(uint256 amount) public onlyOwner returns (uint) {
        qst_token.transferFrom(msg.sender, address(this), amount);
        totalSupply += amount;
        return amount;
    }

    function witdrawToken(uint256 amount) public onlyOwner returns (uint) {
        qst_token.transfer(msg.sender, amount);
        totalSupply -= amount;
        return amount;
    }

    function GetPriceInBNB(uint _PriceInUSD) public view returns (uint) {
        uint256 USDprice = getLatestPriceBNB();
        uint256 calculated = SafeMath.mul(_PriceInUSD, 10 ** 18);
        uint256 PriceInBNB = SafeMath.div(calculated, USDprice);
        return PriceInBNB;
    }

    function holderDetails(
        address account
    ) public view returns (Holder memory) {
        uint index = eachPersonId[account];
        return holderInfo[index];
    }

    receive() external payable {}

    function GiveBNBGetTokens(uint _PriceInBNB) public view returns (uint) {
        uint BNBToUSD = getLatestPriceBNB();
        uint calculated = SafeMath.mul(_PriceInBNB, BNBToUSD);
        uint AmountOfTokens = SafeMath.div(calculated, priceOfSingleToken);
        return AmountOfTokens;
    }

    function GiveBNBGetUSD(uint _PriceInBNB) public view returns (uint) {
        uint BNBtoUSD = getLatestPriceBNB();
        uint calculate = SafeMath.mul(BNBtoUSD, _PriceInBNB);
        uint RealPrice = SafeMath.div(calculate, 10 ** 18);
        return RealPrice;
    }

    function Calculator(uint amountOfTokens) public view returns (uint) {
        uint PriceOfTokensInUSD = SafeMath.mul(
            amountOfTokens,
            priceOfSingleToken
        );
        uint usdPrice = SafeMath.div(PriceOfTokensInUSD, 1e18);
        uint realAmount = GetPriceInBNB(usdPrice);
        uint amount_ = SafeMath.div(realAmount, 1e15);
        uint amount = SafeMath.mul(amount_, 1e15);
        return amount;
    }

    function MinMax() public view returns (uint min, uint max) {
        min = Minimum;
        max = Maximum;
    }

    function BuyToken(
        uint amount
    ) external payable AtLeast(amount, msg.sender) nonReentrant {
        uint index = eachPersonId[msg.sender];
        if (index == 0) {
            holdersCount++;
            eachPersonId[msg.sender] = holdersCount;
            index = holdersCount;
            itemInfo[index].time = block.timestamp;
        }
        uint desiredAmount = holderInfo[index].amount + amount;
        require(desiredAmount <= Maximum, "you reached max!");
        address payable _to = payable(address(this));
        uint PriceOfTokensInBNB = Calculator(amount);
        require(msg.value >= PriceOfTokensInBNB, "BuyToken_Error!!!!");
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send BNB");
        totalIndex++;
        itemInfo[totalIndex] = Holder({
            user: msg.sender,
            amount: amount,
            time: block.timestamp,
            value: msg.value
        });
        holderInfo[index] = Holder({
            user: msg.sender,
            amount: desiredAmount,
            time: holderInfo[index].time,
            value: holderInfo[index].value + msg.value
        });

        curentInflation += amount;
        if (curentInflation >= totalInflation) _applyInflation();
        totalSupply -= amount;
        qst_token.transfer(msg.sender, amount);
    }

    function _applyInflation() internal {
        curentInflation = 0;
        priceOfSingleToken += (priceOfSingleToken / 100) * InflationPersent;
        Minimum -= (Minimum / 100) * InflationPersent;
        Maximum -= (Maximum / 100) * InflationPersent;
    }

    function ChangePriceOfSingletoken(
        uint _NewAmount
    ) external onlyOwner returns (uint) {
        priceOfSingleToken = _NewAmount;
        return priceOfSingleToken;
    }

    function UpdateInflationPersent(
        uint _NewInflation
    ) external onlyOwner returns (uint) {
        InflationPersent = _NewInflation;
        return InflationPersent;
    }

    function UpdateTotalInflation(
        uint _NewInflation
    ) external onlyOwner returns (uint) {
        totalInflation = _NewInflation;
        return totalInflation;
    }

    function UpdateMinimumMaximum(uint min, uint max) external onlyOwner {
        Minimum = min;
        Maximum = max;
    }

    function witdraw(uint256 amount) public onlyOwner returns (bool) {
        payable(owner).transfer(amount);
        return true;
    }

    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
