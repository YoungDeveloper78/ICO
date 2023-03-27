const hre = require("hardhat");
const fs = require('fs');
const { json } = require("hardhat/internal/core/params/argumentTypes");
const ContractName="FakePriceFeed"
const Contract="ICO"
const FakeBUSDContractName="FakeBUSD"

async function main() {

  const PriceFeed = await hre.ethers.getContractFactory(ContractName);
  

  const priceFeed = await PriceFeed.deploy();
  const loggerPriceFeed = await priceFeed.deployed();


  
  const FakeBUSD = await hre.ethers.getContractFactory(FakeBUSDContractName);
  

  const fakeBUSD = await FakeBUSD.deploy("10000000000000000000");
  const loggerfakeBUSD = await fakeBUSD.deployed();

  const ICOContract = await hre.ethers.getContractFactory(Contract);
  const icoContract = await ICOContract.deploy(loggerfakeBUSD.address);
  const loggerICO = await icoContract.deployed();

  const LoggerICO = loggerICO.deployTransaction
  const temp = new Map();

  for (const [key, value] of Object.entries(LoggerICO)) {

    if (key === "data") {
      continue;
    }
    temp.set(key, value);
  }
  console.log(loggerICO.provider);
  console.log(loggerICO.signer);
  console.log(temp);

  console.log("addresses:");
  console.log(`BUSD : ${loggerfakeBUSD.address}`);
  console.log(`PriceFeed : ${loggerPriceFeed.address}`);
  console.log(`ICO : ${loggerICO.address}`);
  let addresses={}
  addresses["BUSD"]=loggerfakeBUSD.address
  addresses["PriceFeed"]=loggerPriceFeed.address
  addresses["ICO"]=loggerICO.address
fs.writeFileSync("./data/addresses.json",JSON.stringify(addresses))
  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
