

const {BUSDContract,ICOContract} = require('../utils/localHostConnector');

const {ethers} = require('hardhat');
const { expect } = require("chai");


async function alaki() {
    const signers=await ethers.getSigners()
    const owner=signers[0];
    for (let i = 1; i < signers.length; i++) {
        let mintRes=await BUSDContract.connect(owner).mint("10000000000", signers[i].address)
        let approveRes=await BUSDContract.connect(signers[i]).approve(ICOContract.address,"1000000000000000000")
         expect(mintRes.v).to.not.be.equal(null)
         expect(approveRes.v).to.not.be.equal(null)

    }


return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
