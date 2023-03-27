

const {ICOContract} = require('../utils/localHostConnector');

const {ethers} = require('hardhat');
const { expect } = require("chai");


async function BnBCalculator(amount) {

         let supply=await ICOContract.Calculator(amount)
        //  supply=ethers.utils.formatEther(supply).toString()
         console.log(supply.toString());
        //  expect(supply).to.be.equal("120000000000.0")
    // 0.40000000000000000000


return supply;
}
// BnBCalculator("100000000000000000000000000")
module.exports = {
  BnBCalculator
};

// alaki().then(res=>{
// console.log(`success : ${res}`);

// }).catch(err=>{
//   console.log(err)
// })
// 120000000000.0