

const {ICOContract} = require('../utils/localHostConnector');

const {ethers} = require('hardhat');
const { expect } = require("chai");


async function alaki() {

    let Maximum=await ICOContract.Maximum()
    let curentInflation=await ICOContract.curentInflation()
    let priceOfSingleToken=await ICOContract.priceOfSingleToken()
    let Minimum=await ICOContract.Minimum()
    let InflationPersent=await ICOContract.InflationPersent()
    
    console.log(`curentInflation : ${curentInflation.toString()}`);
    console.log(`priceOfSingleToken : ${priceOfSingleToken.toString()}`);
    console.log(`Minimum : ${Minimum.toString()}`);
    console.log(`Maximum : ${Maximum.toString()}`);
    console.log(`InflationPersent : ${InflationPersent.toString()}`);


return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
// 120000000000.0