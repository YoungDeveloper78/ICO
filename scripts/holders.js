// const BN = require('bn.js');
const BN = require('bn.js');
const {BnBCalculator} = require('./calculator');
const {BUSDContract,ICOContract} = require('../utils/localHostConnector');
const fs = require('fs');
const {ethers} = require('hardhat');
// const {} = require('ethers');
const { expect } = require("chai");
// ethers.

async function alaki() {

    const signers=await ethers.getSigners()
    let all=[]
    for (let i = 1; i <= signers.length; i++) {
    let items={}
    let data=await ICOContract.holderInfo(i)
    for (const [key, value] of Object.entries(data)) {
        
        if (isNaN(key)) {
            if (key=="user") {
                if (value.toString()!="0x0000000000000000000000000000000000000000") {
                    
                    items[key]=value

                    
                }
                
            }
            else{
                if (value.toString()!="0") {
                    let amount=value
                    if (key!="time") {
                         amount=ethers.utils.formatEther(value.toString())
                        
                    }
                    items[key]=amount.toString()
                    
                }
            }
        }
    }
    all.push(items)
    }
    
    console.log(all);

return true;
}

alaki().then(res=>{
console.log(`success : ${res}`);

}).catch(err=>{
  console.log(err)
})
