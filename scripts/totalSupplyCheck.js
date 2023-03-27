

const {ICOContract} = require('../utils/localHostConnector');

const {ethers} = require('hardhat');
const { expect } = require("chai");


async function alaki() {

         let supply=await ICOContract.Maximum()
         supply=ethers.utils.formatEther(supply)
         console.log(supply.toString());
        //  expect(supply).to.be.equal("120000000000.0")
    


return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
// 120000000000.0