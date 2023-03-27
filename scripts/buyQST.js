// const BN = require('bn.js');
const BN = require('bn.js');
const {BnBCalculator} = require('./calculator');
const {BUSDContract,ICOContract} = require('../utils/localHostConnector');

const {ethers} = require('hardhat');
// const {} = require('ethers');
const { expect } = require("chai");
// ethers.

async function alaki() {

    const signers=await ethers.getSigners()
    const owner=signers[0];
    // for (let i = 1; i < signers.length; i++) {
        let amount="10000000000000000000000000"
        let bnbAmount=await BnBCalculator((amount.toString()))
    //     if (amount.toString()=="40000000000000000000000000") {
    //         amount="40000000000000000000000000";
    //     }

        await ICOContract.connect(signers[1]).BuyToken(amount,{value:bnbAmount})
        
        
//         curentInflation
// priceOfSingleToken
// Minimum
// Maximum
//             amountOfTokens,
    // }
    // console.log(a);

return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
