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
    for (let i = 0; i < signers.length; i++) {
        let amount="10000000000000000000000000"
        let bnbAmount=await BnBCalculator((amount.toString()))

        await ICOContract.connect(signers[i]).BuyToken(amount.toString(),{value:bnbAmount.toString()})
        
        let curentInflation=await ICOContract.curentInflation()
        let priceOfSingleToken=await ICOContract.priceOfSingleToken()
        let Minimum=await ICOContract.Minimum()
        let Maximum=await ICOContract.Maximum()

        // let Maximum=await ICOContract.Maximum()
        // let amountOfTokens=await ICOContract.amountOfTokens()
        console.log(`curentInflation : ${curentInflation.toString()}`);
        console.log(`priceOfSingleToken : ${priceOfSingleToken.toString()}`);
        console.log(`Minimum : ${Minimum.toString()}`);
        console.log(`Maximum : ${Maximum.toString()}`);
        console.log(`===============================`);
        console.log("")
        console.log("");
        console.log(`===============================`);
        // console.log(`curentInflation : ${curentInflation.toString()}`);
//         curentInflation
// priceOfSingleToken
// Minimum
// Maximum
//             amountOfTokens,
    }
    // console.log(a);

return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
