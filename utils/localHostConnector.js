require('dotenv').config({path:"../config/config.env"});
const ethers = require('ethers');
const provider=new ethers.providers.JsonRpcProvider()

const {BUSD} = require('../data/addresses.json');
const BUSDAbi = require('../artifacts/contracts/test/FakeBUSD.sol/FakeBUSD.json').abi;

const {ICO} = require('../data/addresses.json');
const ICOAbi = require('../artifacts/contracts/ICO.sol/ICO.json').abi;



const BUSDContract = new ethers.Contract(BUSD, BUSDAbi, provider);
const ICOContract = new ethers.Contract(ICO, ICOAbi, provider);



module.exports = {BUSDContract,ICOContract};
