

const {BUSDContract,ICOContract} = require('../utils/localHostConnector');

const {ethers} = require('hardhat');
const { expect } = require("chai");


async function alaki() {
    const [owner]=await ethers.getSigners()
    


        let approveRes=await BUSDContract.connect(owner).approve(ICOContract.address,"120000000000000000000000000000")
         expect(approveRes.v).to.not.be.equal(null)
         let addToken=await ICOContract.connect(owner).addToken("120000000000000000000000000000")
         expect(addToken.v).to.not.be.equal(null)
    


return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
