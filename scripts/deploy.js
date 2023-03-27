const hre = require("hardhat");

const Token="FakeBUSD"
const PriceFeedName="FakePriceFeed"
const ICOName="ICO"


async function main() {

  const ICO = await hre.ethers.getContractFactory(ICOName);

  const ico = await ICO.deploy("0x6aeAaf0f124f3F2cA669315281738FcA67725690");
  const logger = await ico.deployed();

  const deployLog = logger.deployTransaction
  const temp = new Map();

  // const QSTToken = await hre.ethers.getContractFactory(Token);

  // const qstToken = await QSTToken.deploy("1000000000000000000");
  // const qstlogger = await qstToken.deployed();

  // const PriceFeed = await hre.ethers.getContractFactory(PriceFeedName);

  // const priceFeed = await PriceFeed.deploy();
  // const logger = await priceFeed.deployed();

  // const deployLog = logger.deployTransaction
  // const temp = new Map();



  for (const [key, value] of Object.entries(deployLog)) {

    if (key === "data") {
      continue;
    }
    temp.set(key, value);
  }
  console.log(logger.provider);
  console.log(logger.signer);
  console.log(temp);
  const LogArr = [logger.provider, logger.signer, temp]

  console.log(
    `address is : ${logger.address}`
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
